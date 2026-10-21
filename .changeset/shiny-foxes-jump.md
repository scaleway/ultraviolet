---
"@ultraviolet/ui": patch
---

Fix ContentCardGroup.Card accessibility: children of the card link inherited the browser default link color instead of the theme text color, making custom content unreadable on dark themes.
