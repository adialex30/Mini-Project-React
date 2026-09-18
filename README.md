# DibiAssets — Marketplace Aset Digital

Marketplace sederhana untuk jual-beli aset digital (UI Kit, Themes, Illustrations, Icons, E-book, dll). Ada dua peran pengguna: **Seller** (kreator/penjual yang mengelola produk) dan **Buyer** (pembeli yang menjelajah katalog).

- **Frontend (Vercel):** https://mini-project-react-taupe.vercel.app
- **Backend API (Railway):** https://mini-project-react-production-dcb3.up.railway.app/api

---

## 1. Tech Stack

| Layer     | Teknologi |
|-----------|-----------|
| Backend   | Laravel (struktur klasik `app/Http/Kernel.php` + `RouteServiceProvider`, gaya Laravel 8/9), Laravel Sanctum (token auth), Eloquent ORM, MySQL |
| Frontend  | React + Vite, Axios (dengan interceptor Bearer token), Tailwind CSS, lucide-react (icon), custom hash-router (`#/landing`, `#/login`, dst — **tanpa** React Router) |
| Auth      | Sanctum *personal access token* (Bearer token), bukan cookie/session SPA |
| Deployment| Frontend di Vercel, Backend di Railway (MySQL kemungkinan juga di-host di Railway) |

---

## 2. Flow Bisnis

1. **Registrasi** — User memilih peran `buyer` atau `seller` saat daftar (`POST /api/register`). Password wajib dikonfirmasi (`password_confirmation`). Token langsung diterbitkan dan disimpan di `localStorage` (`token`, `user`).
2. **Login** — `POST /api/login`. Saat login berhasil, **seluruh token lama milik user dihapus** (`$user->tokens()->delete()`) lalu token baru diterbitkan — jadi sesi lama otomatis invalid setiap kali login ulang.
3. **Katalog produk (publik, tanpa login)** — `GET /api/products` (mendukung `?search=`) dan `GET /api/categories`. Hanya produk dengan `is_active = true` yang tampil. Frontend melakukan debounce 500ms pada pencarian.
4. **Sisi Buyer** — Melihat katalog, filter kategori, tombol "Tambah ke Keranjang". **Catatan:** keranjang ini masih berupa counter lokal di state React — belum ada endpoint order/checkout/pembayaran di backend.
5. **Sisi Seller** — Melihat tombol "+ Tambah Produk" (bukan tombol keranjang). Bisa create/update/delete produk **miliknya sendiri**:
   - Create produk: wajib role `seller` (dicek via `User::isSeller()`), kalau bukan seller → `403`.
   - Update/Delete produk: dicek kepemilikan (`product->user_id === auth user id`), kalau bukan pemilik → `403`.
   - Update/Delete **kategori**: hanya perlu role `seller` (kategori bersifat global/shared, tidak ada kepemilikan per-user).
6. **Slug** — Slug produk & kategori dibuat otomatis dari nama (`Str::slug`). Slug produk ditambah suffix random 6 karakter untuk menghindari duplikat; slug kategori juga di-regenerate ulang setiap kali nama kategori diupdate.
7. **Logout** — `POST /api/logout` menghapus *current access token* di backend; frontend membersihkan `localStorage`.

Semua response API mengikuti format konsisten:
```json
{ "success": true|false, "message": "...", "data": { ... } }
```
Kegagalan validasi mengembalikan HTTP 422 dengan field tambahan `"errors"`.

---

## 3. Daftar Endpoint

| Method | Endpoint                  | Auth?          | Keterangan |
|--------|----------------------------|----------------|------------|
| POST   | `/api/register`            | Publik         | Daftar akun (`role`: `seller`/`buyer`) |
| POST   | `/api/login`               | Publik         | Login, invalidasi token lama, terbitkan token baru |
| POST   | `/api/logout`              | Bearer token   | Hapus token yang sedang dipakai |
| GET    | `/api/products`            | Publik         | List produk aktif (`?search=` opsional) |
| GET    | `/api/products/{id}`       | Publik         | Detail produk |
| POST   | `/api/products`            | Bearer token, role `seller` | Buat produk |
| PUT    | `/api/products/{id}`       | Bearer token, pemilik produk | Update produk |
| DELETE | `/api/products/{id}`       | Bearer token, pemilik produk | Hapus produk |
| GET    | `/api/categories`          | Publik         | List kategori |
| GET    | `/api/categories/{id}`     | Publik         | Detail kategori |
| POST   | `/api/categories`          | Bearer token, role `seller` | Buat kategori (⚠️ lihat catatan validasi di bagian 6) |
| PUT    | `/api/categories/{id}`     | Bearer token, role `seller` | Update kategori |
| DELETE | `/api/categories/{id}`     | Bearer token, role `seller` | Hapus kategori |

---

## 4. Struktur Proyek

```
backend/
├── app/
│   ├── Http/Controllers/Api/   → AuthController, ProductController, CategoryController
│   ├── Http/Requests/Api/      → validasi per fitur (Auth, Product, Category)
│   ├── Http/Resources/Api/     → transformer JSON (User, Product, Category)
│   └── Models/                 → User, Product, Category
├── database/
│   ├── migrations/              → users(+role), categories, products
│   └── seeders/                 → CategorySeeder, ProductSeeder, DatabaseSeeder
└── routes/api.php               → daftar route di atas (otomatis di-prefix "api/" oleh RouteServiceProvider)

frontend/
├── src/pages/     → App (router), LandingPage, Login, Register, Dashboard, ProductCatalog
├── src/components/ui/ → Navbar, Footer, ProductCard, AddProductModal, PromoCarousel, dll.
├── src/hooks/useProductCatalog.js → fetch produk/kategori, search debounce, grouping kategori mirip
└── src/services/  → api.js (axios instance + interceptor token), ProductService.js
```

---

## 5. Cara Menjalankan Secara Lokal

> Source code yang diberikan hanya berisi folder `backend/` dan `frontend/` (tanpa `composer.json`, `package.json`, `.env`, atau file config Vite/Tailwind). Langkah di bawah mengikuti setup standar Laravel + Vite/React — sesuaikan bila konfigurasi asli project berbeda.

### Backend (Laravel)

1. Masuk ke folder `backend/`, install dependency: `composer install`.
2. Siapkan `.env` minimal berisi:
   ```
   APP_KEY=
   APP_URL=http://127.0.0.1:8000
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=marketplace
   DB_USERNAME=root
   DB_PASSWORD=
   ```
   (kalau host DB menyediakan `DATABASE_URL` — misalnya Railway — itu juga otomatis dibaca oleh `config/database.php`).
3. `php artisan key:generate`
4. **Migrate & seed** — ⚠️ **perhatikan urutan seeder** (lihat catatan #1 di bagian 6), jalankan begini agar tidak gagal karena foreign key:
   ```
   php artisan migrate
   php artisan db:seed --class=CategorySeeder
   php artisan db:seed --class=ProductSeeder
   ```
   `ProductSeeder` meng-hardcode `user_id => 1`, jadi **daftarkan minimal satu user (idealnya role `seller`) lebih dulu** lewat `POST /register` sebelum menjalankan seeder ini, supaya foreign key `user_id` tidak gagal.
5. Jalankan server: `php artisan serve` (default `http://127.0.0.1:8000`, cocok dengan fallback `VITE_API_BASE_URL` di frontend).
6. Tidak perlu setting `SANCTUM_STATEFUL_DOMAINS` — auth di sini pakai Bearer token murni (bukan cookie SPA), jadi Sanctum otomatis pakai guard token selama header `Authorization: Bearer ...` dikirim.

### Frontend (React + Vite)

1. Masuk ke folder `frontend/`, install dependency: `npm install` (pastikan `react`, `axios`, `lucide-react`, `tailwindcss`, `vite` tercantum di `package.json` project asli).
2. Buat file `.env` di root `frontend/`:
   ```
   VITE_API_BASE_URL=http://127.0.0.1:8000/api
   ```
   Untuk build produksi, ganti dengan URL backend Railway + `/api`.
3. Jalankan: `npm run dev`.

### Deployment yang sudah berjalan

| Layer | Platform | URL |
|---|---|---|
| Frontend | Vercel | https://mini-project-react-taupe.vercel.app/#/landing |
| Backend  | Railway | https://mini-project-react-production-dcb3.up.railway.app/api |

Pastikan environment variable `VITE_API_BASE_URL` di Vercel diarahkan ke URL Railway di atas (dengan suffix `/api`), dan `APP_URL`/CORS di Railway sudah mengizinkan origin Vercel (`config/cors.php` saat ini `allowed_origins => ['*']`, jadi sudah longgar secara default).

---

## 6. Catatan Teknis / Known Issues (temuan dari review kode)

1. **Urutan seeder salah** — `DatabaseSeeder` memanggil `ProductSeeder` **sebelum** `CategorySeeder`, padahal `products.category_id` adalah foreign key ke `categories`. Kalau dijalankan langsung via `php artisan migrate --seed`, seeding akan gagal. Jalankan seeder secara manual sesuai urutan di bagian 5, atau perbaiki urutan `$this->call([...])` di `DatabaseSeeder.php`.
2. **`ProductSeeder` hardcode `user_id => 1`** — pastikan user dengan id 1 sudah ada (biasanya seller pertama yang register) sebelum seeding produk, kalau tidak akan kena error foreign key constraint.
3. **Validasi kategori kosong** — `StoreCategoryRequest` dan `UpdateCategoryRequest` di `app/Http/Requests/Api/Category/` punya `rules()` yang masih kosong (`return [];`). Artinya create/update kategori **belum ada validasi input** (misalnya `name` bisa dikirim kosong dan akan gagal sebagai error database 500, bukan error validasi 422 yang rapi).
4. **File request yang tidak terpakai** — `app/Http/Requests/Api/Product/StroreCategoryRequest.php` (perhatikan typo "Strore") berisi class `StoreCategoryRequest` dengan validasi `name`/`description`, tapi file ini **tidak pernah di-import/dipakai** di controller manapun — kemungkinan sisa refactor yang aman untuk dihapus, atau justru validasi ini yang seharusnya dipakai di `CategoryController::store()`.
5. **Keranjang belum terhubung ke backend** — fitur "Tambah ke Keranjang" di `useProductCatalog.js` hanya menaikkan counter di state React (`cartCount`), tidak memanggil API apa pun. Belum ada model/endpoint `Order`/`Transaction` di backend.
6. **CORS + credentials** — `config/cors.php` mengizinkan `allowed_origins => ['*']` sekaligus `supports_credentials => true`. Kombinasi ini secara spesifikasi browser CORS sebetulnya tidak valid untuk request berbasis cookie, tapi karena auth di sini pakai Bearer token (bukan cookie), secara praktik tidak bermasalah. Kalau nanti mau beralih ke Sanctum SPA cookie-based auth, `allowed_origins` perlu diganti jadi whitelist domain eksplisit.

---

## 7. Setup Collection Postman

File: `Marketplace_API.postman_collection.json` — berisi 3 folder: **Auth** (Register, Login, Login Failed, Logout), **Products** (Get, Search, Create, Create No Token, Update, Delete), **Categories** (Create, Get).

### Langkah setup

1. Buka Postman → **Import** → pilih/drag file `Marketplace_API.postman_collection.json`.
2. Buat **Environment** baru, misalnya `DibiAssets - Local` dan `DibiAssets - Production`, masing-masing berisi variable:
   | Variable | Local | Production |
   |---|---|---|
   | `base_url` | `http://127.0.0.1:8000/api` | `https://mini-project-react-production-dcb3.up.railway.app/api` |
   | `token` | *(kosongkan, akan terisi otomatis)* | *(kosongkan)* |
3. Pilih environment yang sesuai di dropdown kanan atas Postman sebelum mengirim request.
4. Urutan pengujian yang disarankan (supaya variable environment terisi otomatis lewat script *test* yang sudah ada di collection):
   1. **Register** → buat akun (ubah `email` di body kalau sudah pernah dipakai, karena `email` unik).
   2. **Login** → script test-nya otomatis menyimpan `token` ke environment.
   3. **Create Category** (opsional, kalau mau kategori baru) atau langsung **Get Categories**.
   4. **Create Product** → script test-nya otomatis menyimpan `product_id` ke environment.
   5. **Get Products** / **Search Products** → cek produk muncul.
   6. **Update Product** / **Delete Product** → menggunakan `{{product_id}}` dari langkah 4.
   7. **Login Failed** dan **Create No Token** → kasus negatif (401), bisa dijalankan kapan saja untuk verifikasi validasi & proteksi endpoint.
   8. **Logout** → jalankan terakhir untuk mencabut token yang sedang aktif.
5. Kalau ingin menjalankan semua sekaligus otomatis, gunakan **Collection Runner** dan urutkan request sesuai langkah di atas (folder Auth → Products → Categories tidak otomatis berurutan seperti itu secara default, jadi susun manual di Runner atau jalankan per-request).

> Catatan: field `role` di body **Register** harus `seller` atau `buyer` (sesuai validasi `RegisterRequest`). Untuk bisa memakai request **Create Product**, akun yang login harus ber-role `seller`.
