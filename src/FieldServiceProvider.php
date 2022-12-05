<?php

namespace Datomatic\NovaMarkdownTui;

use Illuminate\Support\ServiceProvider;
use Laravel\Nova\Events\ServingNova;
use Laravel\Nova\Nova;

class FieldServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->publishes([
            __DIR__.'/../config/nova-markdown-tui.php' => config_path('nova-markdown-tui.php'),
        ], 'config');

        Nova::serving(function (ServingNova $event) {
            Nova::script('nova-markdown-tui', __DIR__.'/../dist/js/field.js');
            Nova::style('nova-markdown-tui', __DIR__.'/../dist/css/field.css');
        });
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->mergeConfigFrom(__DIR__.'/../config/nova-markdown-tui.php', 'nova-markdown-tui');
    }
}
