---
"@ultraviolet/ui": minor
---

Refactoring of `<List />` and `<Table />` components:

### List

List used to be a bunch of `div` with different `role` to work like a table but it suffered from columns issues if not correctly set.
It now uses a real `table` element and `thead` and `tbody` to correctly handle columns and rows.
Each elements uses `display: table-*` to correctly handle columns and rows.
The expandable is tricked, by adding a new `tr` on click and a `transform` to move it up under the clicked row.

### Table

Table was correctly using `table` element but the columns were not correctly handled.
It now uses `display: table-*` for each elements of the table.
The expandable is an added `tr` under the clicked row.
