---
"@ultraviolet/ui": patch
---

`Menu` & `Popup`: when `placement='bottom'`, avoid negative values for "translate3d" to prevent negative positioning/x-overflow
