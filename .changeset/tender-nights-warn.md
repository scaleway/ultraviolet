---
"@ultraviolet/ui": minor
---

`FileInput`: various improvements to component:
- new prop `validator` for custom errors
- add default `onChange` for un formatted events
- new prop `disabledDragndrop` to disabled drag and drop behavior
- update prop `onDrop` to return `acceptedFiles` and `errorFiles`
- new props `onKeyDown`, `onKeyUp`, `onFocus`, `onBlur` and `name`.
- new prop `onDelete` for `FileInput.List` 
- When `type = "dropzone"` and `size="small"`, the component is now a button and clicking anywere on it opens the file selector (previously, only clicking on the label opened the file selector)
- Fix style issues