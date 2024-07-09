---
"@ultraviolet/ui": patch
---

Fix `<TextInputV2 />` prop `onChange` will now take function with event.

```tsx
// Before
onChange={value => value}

// After
onChangeValue={value => value}
onChange={event => event.target.value}
```

This will also fix `<DateInput />` issues such as editing the input value.
