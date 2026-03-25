---
"@ultraviolet/ui": patch
---

`TagList`: overflow can dynamically adapt to the container width.

⚠️ Note that this may break some existing tests (a visually hidden div containing the tags is added and not removed). A data-testid has been added to help prevent test failures.

