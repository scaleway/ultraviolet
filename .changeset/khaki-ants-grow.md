---
"@ultraviolet/form": major
---

## Accept control prop

Field can accept a `control` prop. When this prop is provided, the `name` prop must be present in the form and the `onChange` callback is typed.

## Remove defaultValues

You must use the `useForm` hook to provide initial values:

```tsx
// Old
<Form defaultValues={{ foo: 'bar' }}>
  // ...
</Form>

// New
const methods = useForm({ defaultValues: { foo: 'bar' }})

<Form methods={methods}>
  // ...
</Form>
```

## Remove function as child component

Function as child component must be remove:

```tsx
// Old
<Form>
  {({ isSubmitting }) => (
  <Button disabled={isSubmitting}>Submit</Button>
  )}
</Form>

// New
const methods = useForm()

const { isSubmitting } = methods.formState

<Form methods={methods}>
  <Button disabled={isSubmitting}>Submit</Button>
</Form>
```

## onRawSubmit renamed to onSubmit

The `onRawSubmit` is renamed to `onSubmit`.

The return of the function is now a string if an error occurred.

```tsx
// Old
<Form onRawSubmit={(values) => {
  return { [FORM_ERROR]: 'ERROR' }
}}>
  // ...
</Form>

// New
<Form onSubmit={(values) => {
    return 'ERROR'
}}>
  // ...
</Form>
```
