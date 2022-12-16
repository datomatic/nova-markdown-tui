# Laravel Nova Markdown field based on Toast UI Editor

[![Latest Version on Packagist](https://img.shields.io/packagist/v/datomatic/nova-markdown-tui.svg?style=flat-square)](https://packagist.org/packages/datomatic/nova-markdown-tui)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)
[![Total Downloads](https://img.shields.io/packagist/dt/datomatic/nova-markdown-tui.svg?style=flat-square)](https://packagist.org/packages/datomatic/nova-markdown-tui)

A markdown editor field for Laravel Nova based on [Toast UI Editor](https://ui.toast.com/tui-editor) with automatic theme switch.

![Nova Markdown Toast UI Screenshot Light](docs/nova-markdown-tui-light.png)
![Nova Markdown Toast UI Screenshot Dark](docs/nova-markdown-tui-dark.png)

## Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Changelog](#changelog)
- [Security](#security)
- [Contributing](#contributing)
- [Credits](#credits)
- [License](#license)

## Installation

You can install the package via composer:

``` bash
composer require datomatic/nova-markdown-tui
```

The package will automatically register itself.

You can publish the config file with:

```bash
php artisan vendor:publish --provider="Datomatic\NovaMarkdownTui\FieldServiceProvider" --tag="config"
```

## Usage

You can use the `Datomatic\NovaMarkdownTui\ToastUiEditor` field in your Nova resource:

```php
<?php

namespace App\Nova;

use Datomatic\NovaMarkdownTui\MarkdownTui;
use Illuminate\Http\Request;

class BlogPost extends Resource
{
    // ...

    public function fields(Request $request)
    {
        return [
            // ...

            MarkdownTui::make('Content'),

            // ...
        ];
    }

}
```

## Configuration

You may configure the underlying Toast UI Editor instance with the following field's methods.
Checkout [Toast UI - Vue Editor](https://github.com/nhn/tui.editor/tree/master/apps/vue-editor#props) documentation.

You may also configure defaults in the config file.

### initialEditType

`initialEditTypeMarkdown()`

`initialEditTypeWYSIWYG()`

### options

`minHeight(string $minHeight)`

`language(string $language)`

`useCommandShortcut(bool $useCommandShortcut = true)`

`hideModeSwitch(bool $hideModeSwitch = true)`

`toolbarItems(array $toolbarItems)`

### plugins

`plugins(array $plugins)`

Allowed values are:
- `chart`
- `uml`
- `colorSyntax`
- `codeSyntaxHighlight`
- `tableMergedCell`

### height

`height(string $height)`

### previewStyle

`previewStyleVertical()`

`previewStyleTab()`

### Allow iframe in markdown/html

`allowIframe(bool $allowIframe = true)`

## Media upload
You can choose to enable upload of media directly from the editor. The blob of the file will be sent to and endpoint of your choice (eventually with some additional headers that you can choose, to increase security).

To achieve that, you have to set the configs in `config/nova-markdown-tui.php` accordingly:

```php
'mediaUploadUrl' => '/api/nova-markdown-tui/upload', // put your endpoint, or null to disable upload
'mediaUploadHeaders' => [
    'X-Secret-Key' => 'super-secret-token', // if you prefer to protect the endpoint
],
```

In this way, you can store your file as you want: local storage, remote services, ....

The file will be sent as a POST request with Content-Type `multipart/form-data`, with the file in `file` field of the body.
The endpoint should respond with status 200 and a JSON body with the following structure:
```json
{
  "url": "https://datomatic.io/files/image.jpg",
  "alt": "Optional, alt text"
}
```
If `alt` is provided, it will overwrite the "Description" field typed by the user in the editor. Keep it empty if you want to use what the user prompted.

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information on recent changes.

## Security

If you discover any security related issues, please email roberto@datomatic.io instead of using the issue tracker.

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

## Credits
- [Roberto Negro](https://github.com/RobertoNegro)
- [Alberto Peripolli](https://github.com/trippo)
- [Mikaël Popowicz](https://github.com/mikaelpopowicz) (for the, now discontinued, [BBS-Lab/nova-markdown-tui-field](https://github.com/BBS-Lab/nova-markdown-tui-field/) package)
- [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
