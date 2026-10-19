---
'@ultraviolet/ui': patch
---

Fix two accessibility issues found by running axe in a real browser:

- Tooltip: the closed tooltip's content wrapper created a scrollable region without keyboard access (`scrollable-region-focusable`), because of dead `overflow: auto` / `maxHeight: 100%` styles. They are removed.
- ContentCardGroup.Card: children of the card link inherited the browser default link color instead of the theme text color, making custom content unreadable on dark themes.
