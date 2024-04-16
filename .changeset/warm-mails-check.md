---
"@ultraviolet/ui": minor
---

Refactoring of `<MenuV2 />` component with a new style and implement following props:
- New prop `size`: `small`, `medium`, `large`
- New prop `triggerMethod`: `click`, `hover` (default is `click`) it will trigger the menu to open on click or hover
- On `Menu.Item`:
    - New variant `primary` on `sentiment` prop
    - New prop `active` to set the item as active visually
- New sub component `<MenuV2.Group />` to group items together under a label

Refactoring of `<Popup />` component:
- Change of prop `hasDebounce` to `debounceDelay` => the prop will also add delay on the apparition of the popup
