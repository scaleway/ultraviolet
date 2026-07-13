---
"@ultraviolet/form": patch
---

`Form`: add an `_experimentalRegisterMode` property to opt-in to uncontrolled fields which trigger less re-renders, with the caveat that either `defaultValues` or `values` are necessary for correct dirty states.
