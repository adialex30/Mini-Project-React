# Laravel 8 + React (Vite) + Tailwind CSS Setup Guide

Panduan ini menjelaskan langkah demi langkah membuat project **Laravel 8** yang menggunakan **React.js**, **Vite**, dan **Tailwind CSS** mulai dari proses instalasi hingga menjalankan project.

---

# Requirement

Pastikan telah menginstall:

| Software | Versi |
|----------|--------|
| PHP | == 8.5.5 (Disarankan 8.0) |
| Composer | 2.9.7 |
| Node.js | == v24.15.0 |
| NPM | == 11.12.1 |

Cek versi

```bash
php -v
composer -V
node -v
npm -v
git --version
```

---

# 1. Membuat Project Laravel 8

```bash
composer create-project laravel/laravel project-name "8.*"
```

Masuk ke folder project

```bash
cd project-name
```

---

# 2. Copy Environment

```bash
cp .env.example .env
```

Generate key

```bash
php artisan key:generate
```

---

# 3. Konfigurasi Database

Edit file

```
.env
```

Contoh

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel_db
DB_USERNAME=root
DB_PASSWORD=
```

Migrasi database

```bash
php artisan migrate
```

---

# 4. Install React + Vite

Karena Laravel 8 belum menggunakan Vite secara default, install dependency berikut.

Install package

```bash
npm install
```

Install React

```bash
npm install react react-dom
```

Install Vite

```bash
npm install -D vite laravel-vite-plugin
```

Install React Plugin

```bash
npm install -D @vitejs/plugin-react
```

---

# 5. Install Tailwind CSS

Install

```bash
npm install -D tailwindcss postcss autoprefixer
```

Generate konfigurasi

```bash
npx tailwindcss init -p
```

Akan menghasilkan

```
tailwind.config.js
postcss.config.js
```

---



# 6. Jalankan Vite

```bash
npm install
```

Kemudian

```bash
npm run dev
```

Output

```
VITE v5.x ready

Local:
http://localhost:5173
```

Biarkan terminal tetap berjalan.

---

# 7. Jalankan Laravel

Terminal baru

```bash
php artisan serve
```

Output

```
Starting Laravel development server:
http://127.0.0.1:8000
```

---

# 8. Akses Browser

```
http://127.0.0.1:8000
```

Jika berhasil akan muncul

```
Laravel 8 + React + Tailwind CSS
```

---

# 9. Build Production

```bash
npm run build
```

File hasil build akan berada di

```
public/build
```

---

# Struktur Folder

```
project-name
│
├── app
├── bootstrap
├── config
├── database
├── public
│
├── resources
│   ├── css
│   │   └── app.css
│   │
│   ├── js
│   │   ├── app.jsx
│   │   ├── App.jsx
│   │   └── Components
│   │
│   └── views
│       └── welcome.blade.php
│
├── routes
├── storage
├── tests
├── vendor
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── .env
```

---

# Menjalankan Project

## Pertama kali

Install dependency PHP

```bash
composer install
```

Install dependency JavaScript

```bash
npm install
```

Generate APP_KEY

```bash
php artisan key:generate
```

Migrasi database

```bash
php artisan migrate
```

---

## Development

Terminal 1

```bash
php artisan serve
```

Terminal 2

```bash
npm run dev
```

Akses

```
http://127.0.0.1:8000
```

---


# Perintah yang Sering Digunakan

## Install dependency PHP

```bash
composer install
```

## Install dependency JavaScript

```bash
npm install
```

## Jalankan Laravel

```bash
php artisan serve
```

## Jalankan Vite

```bash
npm run dev
```

## Build Production

```bash
npm run build
```

## Clear Cache

```bash
php artisan optimize:clear
```

## Cache Config

```bash
php artisan config:cache
```

## Cache Route

```bash
php artisan route:cache
```

## Cache View

```bash
php artisan view:cache
```

---

# Catatan

- Jalankan `php artisan serve` dan `npm run dev` secara bersamaan selama proses development.
- Untuk deployment production, selalu jalankan `npm run build` agar aset React dan Tailwind dikompilasi ke folder `public/build`.
- Pastikan versi `laravel-vite-plugin` dan `vite` kompatibel dengan proyek Laravel 8 yang digunakan.
