---
"@ultraviolet/ui": minor
---

fix(List.Row): Do not map over invalid children, if a `null` child exist it will break the columns widths because we use child index to retrieve column style
