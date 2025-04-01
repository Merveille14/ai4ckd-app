<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * Définir les routes de l'application.
     */
    public function boot(): void{
        $this->routes(function () {
            // Définir les routes API
            Route::middleware('api')->prefix('api')->group(base_path('routes/api.php'));

            // Définir les routes Web
            Route::middleware('web')->group(base_path('routes/web.php'));
        });
    }
}
