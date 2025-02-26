---
"@ultraviolet/ui": minor
---

- `<Popup />`: fix when there is no animation to not add a `setTimeout` to close the popup. This will improve the behavior of `<SelectInputV2 />` and make the testing less random.
- `<SelectableCard />`: remove pointer events on the radio. We were already doing it with the checkbox version. Also improved tabulation to be more accessible.
- `<Label />`: improve component to accept `as` prop that can take either `label` or `legend`. It also accept `sentiment` and `disabled` props now. The mouse pointer will be a pointer as well when `htmlFor` is passed.
- `<SelectInputV2 />`: improve the focusable elements and fix a visual bug to double click to open the dropdown. Also when there is no space in the input the text will be ellipsis.
- New component `<SelectableCardOptionGroup />`
