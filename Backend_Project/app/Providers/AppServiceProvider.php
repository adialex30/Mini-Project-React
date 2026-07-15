<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Blade;

class AppServiceProvider extends ServiceProvider
{
    public function register()
    {
        //
    }

    public function boot()
    {
        // Daftarkan directive @viteReactRefresh
        Blade::directive('viteReactRefresh', function () {
            return "<?php echo '
                <script type=\"module\">
                    import RefreshRuntime from \"http://localhost:5173/@react-refresh\"
                    RefreshRuntime.injectIntoGlobalHook(window)
                    window.\$RefreshReg\$ = () => {}
                    window.\$RefreshSig\$ = () => (type) => type
                </script>
            '; ?>";
        });

        // Daftarkan directive @vite
        Blade::directive('vite', function ($expression) {
            return "<?php
                \$assets = json_decode(str_replace('\'', '\"', $expression));
                if (is_array(\$assets)) {
                    foreach (\$assets as \$asset) {
                        if (str_ends_with(\$asset, '.css')) {
                            echo \"<link rel='stylesheet' href='http://localhost:5173/{\$asset}'>\";
                        } else {
                            echo \"<script type='module' src='http://localhost:5173/{\$asset}'></script>\";
                        }
                    }
                } else {
                    if (str_ends_with(\$expression, '.css')) {
                        echo \"<link rel='stylesheet' href='http://localhost:5173/{\$expression}'>\";
                    } else {
                        echo \"<script type='module' src='http://localhost:5173/{\$expression}'></script>\";
                    }
                }
            ?>";
        });
    }
}
