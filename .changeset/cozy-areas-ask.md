---
"@ultraviolet/ui": patch
---

`InfoTable.Cell`: 
- should not override the custom style of its children.
- when children are an array of strings or numbers, the same style is applied as for a single string.

`Text`: updated tooltip detection logic to handle overflowing content when children are of type `(string | number)[]`. Such arrays are now converted to strings for tooltip display. For example:
```js
<Text as="p" variant="body">Ready?{isReady ? "Yes!" : "No..."}</Text>
```
Previously, no tooltip appeared when overflowing since the computed child was `['Ready?', 'Yes!']` (or `['Ready?', 'No...']`). Now, the tooltip correctly displays `Ready? Yes!`.
