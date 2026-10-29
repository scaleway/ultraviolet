---
"@ultraviolet/ui": patch
---

`UnitInput`: fix infinite re-render loop when a controlled `value` becomes `NaN` (`NaN !== NaN` never converged in the render-phase prop sync; now compared with `Object.is`)
