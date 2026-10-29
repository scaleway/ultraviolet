---
"@ultraviolet/ui": patch
---

`SelectedInput`: migrate to new popup, which fixes a few issues :
- placement will be automatic to avoid overflow on the page
- focus on (first) selected element when opening the dropdown and the first element if no element is selected. If searchable, focus goes to the search bar by default
- deprecate `dropdownAlign` prop



`Popup`: add props `matchTriggerMaxWidth`, `minWidth` and `maxWidth` to use in the `SelectInput`