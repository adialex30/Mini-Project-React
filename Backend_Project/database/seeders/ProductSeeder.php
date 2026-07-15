<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
public function run()
{

    $products = [
        [
            'user_id' => 1,
            'category_id' => 1,
            'name' => 'UI Kit Premium',
            'description' => 'Paket UI Kit lengkap untuk Figma',
            'price' => 150000,
            'stock' => 999,
        ],
        [
            'user_id' => 1,
            'category_id' => 1,
            'name' => 'Template Landing Page',
            'description' => 'Template modern untuk website bisnis',
            'price' => 200000,
            'stock' => 100,
        ],
        [
            'user_id' => 1,
            'category_id' => 2,
            'name' => 'E-Book Laravel',
            'description' => 'Panduan lengkap belajar Laravel',
            'price' => 75000,
            'stock' => 50,
        ],
        [
            'user_id' => 1,
            'category_id' => 2,
            'name' => 'E-Book PHP Dasar',
            'description' => 'Belajar PHP dari dasar hingga mahir',
            'price' => 50000,
            'stock' => 75,
        ],
        [
            'user_id' => 1,
            'category_id' => 3,
            'name' => 'Flat Illustration Pack',
            'description' => 'Kumpulan ilustrasi flat modern',
            'price' => 120000,
            'stock' => 40,
        ],
        [
            'user_id' => 1,
            'category_id' => 3,
            'name' => 'Business Illustration Bundle',
            'description' => 'Ilustrasi bertema bisnis dan startup',
            'price' => 180000,
            'stock' => 35,
        ],
        [
            'user_id' => 1,
            'category_id' => 4,
            'name' => 'Minimal Icon Pack',
            'description' => '500+ ikon minimalis',
            'price' => 80000,
            'stock' => 200,
        ],
        [
            'user_id' => 1,
            'category_id' => 4,
            'name' => 'Social Media Icons',
            'description' => 'Paket ikon media sosial',
            'price' => 60000,
            'stock' => 150,
        ],
        [
            'user_id' => 1,
            'category_id' => 1,
            'name' => 'Dashboard UI Kit',
            'description' => 'Template dashboard admin modern',
            'price' => 250000,
            'stock' => 80,
        ],
        [
            'user_id' => 1,
            'category_id' => 1,
            'name' => 'Mobile Banking UI',
            'description' => 'Desain aplikasi mobile banking',
            'price' => 220000,
            'stock' => 70,
        ],
        [
            'user_id' => 1,
            'category_id' => 2,
            'name' => 'Portfolio Website Theme',
            'description' => 'Tema portfolio profesional',
            'price' => 175000,
            'stock' => 120,
        ],
        [
            'user_id' => 1,
            'category_id' => 2,
            'name' => 'Agency Website Theme',
            'description' => 'Tema website agency kreatif',
            'price' => 195000,
            'stock' => 90,
        ],
        [
            'user_id' => 1,
            'category_id' => 3,
            'name' => 'Character Illustration Set',
            'description' => 'Set ilustrasi karakter profesional',
            'price' => 160000,
            'stock' => 60,
        ],
        [
            'user_id' => 1,
            'category_id' => 3,
            'name' => 'Food Illustration Pack',
            'description' => 'Ilustrasi makanan berkualitas tinggi',
            'price' => 130000,
            'stock' => 45,
        ],
        [
            'user_id' => 1,
            'category_id' => 4,
            'name' => 'Outline Icon Collection',
            'description' => 'Paket ikon outline modern',
            'price' => 70000,
            'stock' => 300,
        ],
        [
            'user_id' => 1,
            'category_id' => 4,
            'name' => '3D Icon Pack',
            'description' => 'Ikon 3D untuk aplikasi modern',
            'price' => 210000,
            'stock' => 55,
        ],
        [
            'user_id' => 1,
            'category_id' => 1,
            'name' => 'E-Commerce UI Kit',
            'description' => 'UI Kit lengkap untuk toko online',
            'price' => 275000,
            'stock' => 65,
        ],
        [
            'user_id' => 1,
            'category_id' => 2,
            'name' => 'Restaurant Website Theme',
            'description' => 'Tema website restoran modern',
            'price' => 165000,
            'stock' => 110,
        ],
        [
            'user_id' => 1,
            'category_id' => 3,
            'name' => 'Travel Illustration Bundle',
            'description' => 'Kumpulan ilustrasi bertema perjalanan',
            'price' => 145000,
            'stock' => 55,
        ],
        [
            'user_id' => 1,
            'category_id' => 4,
            'name' => 'Finance Icon Pack',
            'description' => 'Ikon bertema keuangan dan investasi',
            'price' => 90000,
            'stock' => 180,
        ],
    ];

foreach ($products as $product) {
    Product::updateOrCreate(
        [
            'slug' => Str::slug($product['name']),
        ],
        [
            'user_id' => $product['user_id'],
            'category_id' => $product['category_id'],
            'name' => $product['name'],
            'description' => $product['description'],
            'price' => $product['price'],
            'stock' => $product['stock'],
        ]
    );
    }
}
}
