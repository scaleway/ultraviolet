---
'@ultraviolet/form': patch
---

fix(KeyValueField): translate validation errors like the other fields. Regex (`pattern`) and `required` validation errors are now rendered through the error translations passed to `Form` (`getError`), instead of the raw react-hook-form message which was always empty. Required failures also produce a `required` error instead of a misleading `pattern` one.
