---
"@ultraviolet/form": patch
---

Migrate `TextAreaField` and `TimeInputField` to use the `useField` hook, centralizing React-Hook-Form logic (rules, error label resolution, regex validation, event normalization). No behavior change — both components now also support the experimental register mode via `Form`'s `_experimentalRegisterMode` prop.
