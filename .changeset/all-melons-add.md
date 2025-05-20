---
"@ultraviolet/illustrations": minor
---
- Rename script "uploadIllustrations.tsx" to "update-illustrations.tsx", to match other scripts
- New component `WireIllustration`
- New script "update-illustration-components.tsx" to automatically update `WireIllustration` and `DynamicIllustration` when new assets are added.
- Now `DynamicIllustration` (as well as the new component) works the same way as every other illustration : everyting is automated, simply add an asset to the correct folder and make a merge request
- Update Github action to upload illustration when merging on beta
- Update Ultraviolet/illustrations readme