---
"@ultraviolet/ui": patch
---

`Popup (v2)`: Escape only closes the top-level overlay. An open Popup doesn't close its parent Modal/Drawer, and a Modal opened inside a Popup doesn't close the Popup.
