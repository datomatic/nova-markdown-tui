<?php

return [
    // If null, app()->getLocale() is used.
    'language' => null,

    'initialEditType' => \Datomatic\NovaMarkdownTui\Enums\EditorType::WYSIWYG,

    'previewStyle' => \Datomatic\NovaMarkdownTui\Enums\PreviewStyle::TAB,

    'height' => 'auto',
    'minHeight' => '200px',

    'useCommandShortcut' => true,
    'usageStatistics' => false,

    'hideModeSwitch' => false,

    'toolbarItems' => [
        [
            'heading',
            'bold',
            'italic',
            'strike',
        ],
        [
            'hr',
            'quote',
            ],
        [
            'ul',
            'ol',
            'task',
            'indent',
            'outdent',
            ],
        [
            'table',
            'image',
            'link',
            ],
        [
            'code',
            'codeblock',
        ]
    ],

    'plugins' => ['chart', 'tableMergedCell', 'uml', 'colorSyntax', 'codeSyntaxHighlight'],

    'allowIframe' => false,
];
