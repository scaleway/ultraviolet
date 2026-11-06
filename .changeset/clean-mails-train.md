---
"@ultraviolet/ui": patch
---

`Modal`: fix accessibility issues:
- add `aria-labelledby` and `aria-describedby` props to link the heading and content to the dialog
- add `imageAlt` prop to provide an accessible description to the image
- correctly restore focus on close when using the `open` prop
- add `accessibleLabel` prop for hidden label and deprecate `aria-label`
