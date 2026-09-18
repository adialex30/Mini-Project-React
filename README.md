# Mini Project React

Aplikasi web marketplace sederhana menggunakan **React.js** sebagai frontend dan **Laravel REST API** sebagai backend.

## Live Demo

**Frontend — Vercel**
https://mini-project-react-taupe.vercel.app/#/landing

**Backend API — Railway**
https://mini-project-react-production-dcb3.up.railway.app/

## Tech Stack

* React.js
* Vite
* Tailwind CSS
* Axios
* Laravel
* PHP
* MySQL
* REST API
* Laravel Sanctum
* Postman

---

# Installation

## Requirements

Pastikan sudah menginstall:

* PHP
* Composer
* Node.js & npm
* MySQL
* Git

Cek versi:

```bash
php -v
composer -V
node -v
npm -v
```

---

# Backend Setup

Masuk ke folder backend:

```bash
cd backend
```

Install dependency:

```bash
composer install
```

Copy `.env.example` menjadi `.env`.

### Windows

```bash
copy .env.example .env
```

### Linux / macOS

```bash
cp .env.example .env
```

Generate application key:

```bash
php artisan key:generate
```

## Database

Buat database MySQL:

```sql
CREATE DATABASE mini_project;
```

Kemudian konfigurasi `.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=mini_project
DB_USERNAME=root
DB_PASSWORD=
```

Sesuaikan username dan password MySQL dengan konfigurasi lokal.

Jalankan migration dan seeder:

```bash
php artisan migrate --seed
```

Jalankan backend:

```bash
php artisan serve
```

Backend akan tersedia di:

```text
http://127.0.0.1:8000
```

---

# Frontend Setup

Buka terminal baru:

```bash
cd frontend
```

Install dependency:

```bash
npm install
```

Jika menggunakan environment variable untuk API, buat file `.env`:

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

Jalankan frontend:

```bash
npm run dev
```

Frontend akan tersedia di:

```text
http://localhost:5173
```

---

# Postman API Collection

Project menyediakan **Postman Collection** untuk melakukan testing REST API.

File:

```text
Marketplace_API.postman_collection.json
```

Collection mencakup:

* Authentication

  * Register
  * Login
  * Login Failed
  * Logout
* Products

  * Get Products
  * Search Products
  * Create Product
  * Update Product
  * Delete Product
  * Authentication Test
* Categories

  * Create Category
  * Get Categories

Collection menggunakan variable:

```text
{{base_url}}
{{token}}
```

Token akan otomatis disimpan setelah login berhasil.

## Setup Postman

1. Buka Postman.
2. Pilih **Import**.
3. Pilih file `Marketplace_API.postman_collection.json`.
4. Atur `base_url`.

### Local

```text
http://127.0.0.1:8000/api
```

### Production

```text
https://mini-project-react-production-dcb3.up.railway.app/api
```

Setelah itu jalankan **Register → Login** untuk mendapatkan authentication token sebelum menjalankan endpoint yang membutuhkan authentication.

---

# Production

Frontend telah di-deploy menggunakan **Vercel**, sedangkan backend API telah di-deploy menggunakan **Railway**.

Frontend:

https://mini-project-react-taupe.vercel.app/#/landing

Backend:

https://mini-project-react-production-dcb3.up.railway.app/

---

## Author

**Aditya Dwi Irawan**
