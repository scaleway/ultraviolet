---
"@ultraviolet/ui": minor
---

`Popover`: rebuild on the new `Popup` and fix its accessibility.

- the popover always flips automatically when there is not enough space, so the `auto` / `auto-*` placements are deprecated (the `auto` prefix is ignored)
- `align` is deprecated and ignored: the popover is always centered on its reference element
- `dynamicDomRendering` is deprecated and ignored: the popup is always rendered dynamically
- `maxWidth` is deprecated and ignored: the Popover has a fixed width derived from the `size` prop
- `maxHeight` is deprecated and ignored: the Popover should not have so much content that it needs to scroll
- accessibility fixes: the dialog is named by its visible title, the trigger exposes relevant aria attributes, focus moves into the dialog on open, is trapped while open and returns to the trigger on close
