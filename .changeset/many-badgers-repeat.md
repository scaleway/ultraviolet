---
"@ultraviolet/utils": patch
---

`useClipboard`: fix hook not reacting to prop updates. Clipboard operations now always use the latest values of `text` and `options`
