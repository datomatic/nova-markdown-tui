<?php

namespace Datomatic\NovaMarkdownTui;

use Datomatic\NovaMarkdownTui\Enums\EditorType;
use Datomatic\NovaMarkdownTui\Enums\PreviewStyle;
use Laravel\Nova\Fields\Field;

class MarkdownTui extends Field
{
    /**
     * The field's component.
     *
     * @var string
     */
    public $component = 'nova-markdown-tui';

    /**
     * Indicates if the element should be shown on the index view.
     *
     * @var bool
     */
    public $showOnIndex = false;

    protected $initialEditorType;

    protected $plugins;

    protected $options;

    protected $height;

    protected $previewStyle;

    protected $allowIframe;

    protected $language;

    public function __construct($name, $attribute = null, callable $resolveCallback = null)
    {
        parent::__construct($name, $attribute, $resolveCallback);

        $this->language = config('nova-markdown-tui.language', app()->getLocale()) ?? app()->getLocale();
        $this->initialEditorType = config('nova-markdown-tui.initialEditorType');
        $this->plugins = config('nova-markdown-tui.plugins');
        $this->options = config('nova-markdown-tui.options');
        $this->height = config('nova-markdown-tui.height');
        $this->previewStyle = config('nova-markdown-tui.previewStyle');
        $this->allowIframe = (bool) config('nova-markdown-tui.allowIframe');
    }

    public function initialEditorType(EditorType $type)
    {
        $this->initialEditorType = $type;

        return $this;
    }


    public function minHeight(string $minHeight)
    {
        $this->options['minHeight'] = $minHeight;

        return $this;
    }

    public function language(string $language)
    {
        $this->options['language'] = $language ?? app()->getLocale();

        return $this;
    }

    public function useCommandShortcut(bool $useCommandShortcut = true)
    {
        $this->options['useCommandShortcut'] = $useCommandShortcut;

        return $this;
    }

    public function hideModeSwitch(bool $hideModeSwitch = true)
    {
        $this->options['hideModeSwitch'] = $hideModeSwitch;

        return $this;
    }

    public function toolbarItems(array $toolbarItems)
    {
        $this->options['toolbarItems'] = $toolbarItems;

        return $this;
    }

    public function height(string $height)
    {
        $this->height = $height;

        return $this;
    }

    public function previewStyle(PreviewStyle $style)
    {
        $this->previewStyle = $style;

        return $this;
    }

    public function allowIframe(bool $allowIframe = true)
    {
        $this->allowIframe = $allowIframe;

        return $this;
    }

    public function plugins(array $plugins)
    {
        $this->plugins = $plugins;

        return $this;
    }

    public function jsonSerialize(): array
    {
        return [
            ...parent::jsonSerialize(),
            'editor' => [
                'language' => $this->language,
                'initialEditType' => $this->initialEditorType->value,
                'plugins' => $this->plugins,
                'options' => $this->options,
                'height' => $this->height,
                'previewStyle' => $this->previewStyle->value,
                'allowIframe' => $this->allowIframe === true,
            ],
        ];
    }
}
