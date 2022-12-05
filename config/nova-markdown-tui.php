<?php

return [

    'initialEditorType' => \Datomatic\NovaMarkdownTui\Enums\EditorType::WYSIWYG,

    'options' => [
        'minHeight' => '200px',
        'language' => 'en-US',
        'useCommandShortcut' => true,
        'usageStatistics' => false,
        'hideModeSwitch' => false,
        'toolbarItems' => [
            'heading',
            'bold',
            'italic',
            'strike',
            'divider',
            'hr',
            'quote',
            'divider',
            'ul',
            'ol',
            'task',
            'indent',
            'outdent',
            'divider',
            'table',
            'image',
            'link',
            'divider',
            'code',
            'codeblock',
        ],
    ],

    'plugins' => ['chart', 'tableMergedCell', 'uml', 'colorSyntax', 'codeSyntaxHighlight'],

    'height' => '300px',

    'previewStyle' => \Datomatic\NovaMarkdownTui\Enums\PreviewStyle::TAB,

    'allowIframe' => false,

];
