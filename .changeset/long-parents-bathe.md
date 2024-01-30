---
"@ultraviolet/themes": minor
---

Gradients have been updated, the structure and access to it had been improved. Here is what changed:
- Previously you were accessing to this token: `color.other.gradient.background.fuschia` and now you can access it like this: `color.other.gradient.background.linear.fuschia`. The same applies to all other gradients. 
Keep in mind that for now the old way still works as this update is NOT breaking change but it will be removed in the future.
- New gradient have been added and are accessible via `color.other.gradient.background.radial`.
