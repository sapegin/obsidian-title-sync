# Better Title Sync Obsidian plugin

[Obsidian](https://obsidian.md) plugin that synchronies title in Markdown when file is renamed.

[![Washing your code. A book on clean code for frontend developers](https://sapegin.me/images/washing-code-github.jpg)](https://sapegin.me/book/)

## What this plugin does

Whenever you rename a file, this plugin does the following:

1. If the old filename matches the first-level heading (`#`) in Markdown, it updates the heading to match the new filename.
2. If there’s no first-level heading in Markdown, it adds a heading that matches the new filename.
3. If the first-level heading in Markdown doesn’t match the old filename, it does nothing.

**Note:** This plugin is intended to be used with disabled “Show inline title” option in Obsidian.

## Motivation

I want my Markdown files to be self-contained and have a first-level heading (`# Pizza`), so they work look good in any app, not just in Obsidian.

Also, sometimes I want to use special characters in the title (such as `():`) that aren’t allowed in filenames. This is only possible with a first-level heading, which creates inconsistent notes with default Obsidian settings (when the “Show inline title” option is enabled).

This plugin was inspired by the [Title renamer](https://github.com/stroiman/obsidian-title-sync) plugin.

## Sponsoring

This software has been developed with lots of coffee, buy me one more cup to keep it going.

<a href="https://www.buymeacoffee.com/sapegin" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/lato-orange.png" alt="Buy Me A Coffee" height="51" width="217"></a>

## Contributing

Bug fixes are welcome, but not new features. Please take a moment to review the [contributing guidelines](Contributing.md).

## Authors and license

[Artem Sapegin](https://sapegin.me) and [contributors](https://github.com/sapegin/obsidian-better-title-sync/graphs/contributors).

MIT License, see the included [License.md](License.md) file.
