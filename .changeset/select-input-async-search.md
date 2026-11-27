---
'@ultraviolet/ui': minor
---

feat(SelectInput): add `onSearch` prop to let the consumer handle the search instead of the built-in local filtering. When provided, the search bar calls `onSearch` with the search value, debounced by 300 milliseconds, and does not filter the options locally: the consumer is responsible for updating `options` (e.g. from an async query). The search bar also stays visible while `isLoading` is true in that case.
