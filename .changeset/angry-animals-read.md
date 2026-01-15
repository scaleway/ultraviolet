---
"@ultraviolet/plus": minor
---

`Navigation`: 
- Fix issue with `Navigation.Separator` height
- New subComponent `Navigation.ShowHide`, paired with new props such as `showHide` (`NavigationProvider`) and `alwaysVisible` (`Navigation.Item`). With this feature, it is possible to add a "show/hide" button to only display items with the `alwaysVisible` prop set to true.
- New prop `additionalData` (`Navigation.Group`) to display information on the right of a group
- `PinnedItem`: fix color of dropable area indicator