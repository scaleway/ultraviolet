---
"@ultraviolet/ui": patch
---

Helper improvement:
- Standardize `helper` prop type as `ReactNode` in all components
- New component `Helper` component to centralize helper logic and improve accessibility
- Implement `aria-describedby` support: when using `<Helper />` instead of the internal `helper` prop, pass the Helper's `id` to the component's `aria-describedby` prop to correctly link the content
