---
"@ultraviolet/ui": major
---

! POTENTIAL BREAKING CHANGES !
Fixed the `maxLength` prop on TagList. This prop was previously implemented incorrectly and would only reduce the threshold by one when the total length exceeded `maxLength`.
This change might affect the number of visible tags, particularly if you have many long tags (the default `maxLength` is set to `600` characters) or if you have specified a custom `maxLength`.
