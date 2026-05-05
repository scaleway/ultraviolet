---
"@ultraviolet/ui": patch
---

Helper improvement:
- Standardize `helper` prop type as `ReactNode` in all components
- New component `Helper` component to centralize helper logic and improve accessibility
- Implement `aria-describedby` support: when using `<Helper />` instead of the internal `helper` prop, pass the Helper's `id` to the component's `aria-describedby` prop to correctly link the content
- ⚠️ Some components (such as `Checkbox`) previously displayed both an error message and the helper text when both prop were defined. This is **not** the case anymore: an `error` message now always **replaces** the helper content. ⚠️ Priority: `error` > `success` > `helper`.
