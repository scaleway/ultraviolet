---
"@ultraviolet/ui": minor
---

`VerificationCode`: fix accessibility issues. To improve accessibility, the component now uses one singular input which might break tests. ⚠️`onChange` and `onComplete` values have been updated to be `string` instead of `unknown`.⚠️