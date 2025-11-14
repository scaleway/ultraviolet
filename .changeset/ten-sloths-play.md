---
"@ultraviolet/ui": patch
---

All `Popup` components (`Popover`, `Tooltip`, `Menu`): 4 new positions `auto-` to have auto-placement but give priority to a direction. For instance, `auto-bottom` will try to place the popup beneath the disclosure first, if there is not enough place it will try top, then left, then right. 
The priorities are :
- `auto-bottom` : bottom > top > left > right
- `auto-left` : left > right > top > bottom
- `auto-right` : right > left > top > bottom
- `auto` and `auto-top` : top > bottom > left > right

**BREAKING CHANGE**
`Menu`: prop `noShrink` renamed `shrink` with opposite behavior