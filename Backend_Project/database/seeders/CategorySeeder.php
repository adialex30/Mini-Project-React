<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use Illuminate\Support\Str;


class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'UI Kits', 'description' => 'Template dan kit antarmuka'],
            ['name' => 'Themes', 'description' => 'Tema website dan aplikasi'],
            ['name' => 'Illustrations', 'description' => 'Asset ilustrasi digital'],
            ['name' => 'Icons', 'description' => 'Paket ikon'],
        ];

        foreach ($categories as $cat) {
            Category::create([
                'name'        => $cat['name'],
                'slug'        => Str::slug($cat['name']),
                'description' => $cat['description'],
            ]);
        }
    }
}
