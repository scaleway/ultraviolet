---
"@ultraviolet/form": patch
"@ultraviolet/ui": patch
---

- Fix `<TextArea />` and `<TextAreaField />`:
  - To have correct focus / active styles
  - Update prop `rows` to accept `auto` which will automatically adjust the height of the textarea based on its content
