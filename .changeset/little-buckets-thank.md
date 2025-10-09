---
"@ultraviolet/ui": patch
---

`Menu` & `Popup`: when `placement='bottom'` or `placement='top'`, avoid negative values for "translate3d" to prevent negative positioning/x-overflow
