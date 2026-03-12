---
"@ultraviolet/ui": patch
---

`List.Row`: new prop `disabledClickRowToExpand`. When enabled, it completely disables expanding a row by clicking anywhere on it. 
**Note**:  If this prop is set to `true` and `expandable` is `false` on the `List`, the row cannot be expanded at all.

`OfferList`: Clicking a row now selects it, even if the row is expandable. To expand an expandable row, users must click the dedicated expand button instead of anywhere on the row.