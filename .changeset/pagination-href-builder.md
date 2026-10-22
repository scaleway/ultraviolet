---
"@ultraviolet/ui": patch
---

`Pagination`: add `hrefBuilder` prop to render pagination items as links instead of buttons, and an optional `renderLink` prop to render a custom link element (e.g. a routing `Link`) per page. The current page item now uses `aria-current="page"`.
