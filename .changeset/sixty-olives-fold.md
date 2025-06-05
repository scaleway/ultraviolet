---
"@ultraviolet/ui": patch
---

`<Loader />`: **breaking changes**
- align size on system icons : now size can only be "xsmall" (0.75rem/12px), "small" (1rem/16px), "medium" (1.25rem/20px), "large" (1.5rem/24px), "xlarge" (2rem/32px), or "*xxlarge*" (3.5rem/56px). By default, `size = "xlarge"` to match the old size.
- remove prop `color`, use `sentiment` instead. By default, `sentiment = primary`.
- remove props `trailColor`, `text`and `strokeWidth`.
