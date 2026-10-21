---
"@ultraviolet/ui": patch
---

Fix Tooltip accessibility: the closed tooltip's content wrapper created a scrollable region without keyboard access (`scrollable-region-focusable`), because of dead `overflow: auto` / `maxHeight: 100%` styles. They are removed.
