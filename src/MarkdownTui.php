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

    protected $options;

    public function __construct($name, $attribute = null, callable $resolveCallback = null)
    {
        parent::__construct($name, $attribute, $resolveCallback);

        $this->options = [
            ...config('nova-markdown-tui', []),
            'language' => config('nova-markdown-tui.language', app()->getLocale()) ?? app()->getLocale(),
        ];
    }

    public function initialEditType(EditorType $type)
    {
        $this->options['initialEditType'] = $type;

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
        $this->options['height'] = $height;

        return $this;
    }

    public function previewStyle(PreviewStyle $style)
    {
        $this->options['previewStyle'] = $style;

        return $this;
    }

    public function allowIframe(bool $allowIframe = true)
    {
        $this->options['allowIframe'] = $allowIframe;

        return $this;
    }

    public function plugins(array $plugins)
    {
        $this->options['plugins'] = $plugins;

        return $this;
    }

    public function jsonSerialize(): array
    {
        return [
            ...parent::jsonSerialize(),
            'editor' => [
                ...$this->options,
                'initialEditType' => $this->options['initialEditType']->value,
                'previewStyle' => $this->options['previewStyle']->value,
                'allowIframe' => $this->options['allowIframe'] === true,
            ],
        ];
    }
}
