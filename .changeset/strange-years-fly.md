---
"@ultraviolet/ui": patch
---

- Fix `<Popup />` component to set initial position to 0 avoiding scroll on top when appearing and if an input has `autoFocus` inside
- New prop `dynamicDomRendering` to define if the popup will be rendered dynamically in the DOM or if it should be rendered at first render. Default is `true` to keep the current retro compatibility.
- Fix `<SelectInputV2 />` to remove timeout on search bar focus
