---
"@ultraviolet/form": minor
---

Form element can have a `errorLabel` (string)  to use as a custom value to display (instead of the label) when an error is displayed (empty required element, min/max value not respected, etc.).

For instance, this component: 
```js
<NumberInputField label="Choose number of elements" errorLabel="Amount" value={20} max={10} />
```
Used with this error:
```js
import type { FormErrors } from '@ultraviolet/form'
import { NumberInputField } from '@ultraviolet/form'

const errors: FormErrors = {
   ...
   isInteger: ...
   max: ({ max, label }) => `${label} must be less than ${max}$`,
   min: ...
   ...
}
```
The displayed `max` error message is `Amount must be less than 10` instead of `Choose number of elements must be less than 10`.

It allows custom error labels with a fallback on the `label` if `errorLabel` is not defined — this can be useful when creating a default `useError`.