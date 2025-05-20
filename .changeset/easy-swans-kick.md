---
"@ultraviolet/form": major
"@ultraviolet/ui": major
---

All group input have a breaking changes in their props:

- `label` is now longer needed, use `legend` instead.
- `legend` type moved from `ReactNode` to `string`. Use `legendDescription` to add more information.
- new prop `legendDescription` to add more information to the legend.
