---
"@ultraviolet/ui": minor
---

Improve `<SearchInput />`:
  - prop `shortcut` now takes an array of string in addition to boolean. This way you can define multiple shortcuts for the same input: `shortcut={['/', 's']` for example.
  - prop `children` is now optional. If not provided the popup will not be displayed and the input will behave like a regular input.
  - new prop `className`
