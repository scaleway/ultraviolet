---
"@ultraviolet/ui": patch
---

`FileInput`: 
- update FileList type to more closely match default File type. ⚠️ This is a breaking change for typing ⚠️ 
- fix onChange: returns the whole list of files (as a FileList), not just the newly added one.