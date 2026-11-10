---
"@ultraviolet/ui": minor
---

`Alert`: add an `action` prop to display a `Button` or a `Link` at the end of the alert. `action` and `children` also accept a render function that provides the alert `buttonProps` (`sentiment`, `disabled`, `size`) to render a correctly themed `Button`. `buttonText` and `onClickButton` are deprecated in favor of `action`.
