---
'@ultraviolet/ui': patch
---

Updated dependency `@nivo/bar` to `0.99.0`.
Updated dependency `@nivo/core` to `0.99.0`.
Updated dependency `@nivo/line` to `0.99.0`.
Updated dependency `@nivo/pie` to `0.99.0`.
Updated dependency `@nivo/scales` to `0.99.0`.
Updated dependency `@nivo/treemap` to `0.99.0`.

`LineChart`: ⚠️ Breaking change: type of `point` in `tooltipFunction` has changed slightly: use `point.x` instead of `point.data.x` (and similarly `point.y` instead of `point.data.y`). `xFormatted` and `yFormatted` remain unchanged