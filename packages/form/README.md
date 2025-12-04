# Ultraviolet Form

[![npm version](https://badge.fury.io/js/%40ultraviolet%2Fform.svg)](https://badge.fury.io/js/%40ultraviolet%2Fform)

Ultraviolet Form is an extension of Ultraviolet UI including everything to build forms using React.
It is using [React Hook Form](https://react-hook-form.com/) under the hood.

## Get Started

```sh
$ pnpm add @ultraviolet/form @ultraviolet/themes
```

### Usage

To use the library you need to put a `ThemeProvider` from `@ultraviolet/themes` with the theme that comes from the same package or from `@ultraviolet/ui` then wrap all your fields inside a `Form`:

```tsx
import { ThemeProvider } from '@ultraviolet/themes'
import { Form, TextInputField } from '@ultraviolet/form'
import { theme } from '@ultraviolet/ui' // or import { theme } from "@ultraviolet/themes
import { useForm } from '@ultraviolet/form'
import '@ultraviolet/ui/styles'

// Here are the input types of your form
type FormValues = {
  firstName: string
  lastName: string
}

// We define the initial values of the form
const INITIAL_VALUES: FormValues = {
  firstName: 'Marc',
  lastName: 'Scout',
} as const

export default function App() {
  const methods = useForm<FormValues>({
    defaultValues: INITIAL_VALUES,
    mode: 'onChange',
  })
  
  const formErrors = {
    required: () => 'This field is required',
    // Add more error messages as needed for min, max, etc.
  }
  
  const onSubmit = async ({
    firstName,
    lastName,
  }: FormValues) => {
    // Add your form submission logic here
    console.log('Form submitted with values:', { firstName, lastName })
  }

  return (
    <ThemeProvider theme={theme}>
      <Form methods={methods} errors={formErrors} onSubmit={onSubmit}>
        <TextInputField name="firstName" />
        <TextInputField name="lastName" />
      </Form>
    </ThemeProvider>
  )
}
```

###  `useWatch` Hook

You can use the `useWatch` hook from `@ultraviolet/form` to watch specific fields in your form thus subscribing to their changes.
It can be useful for displaying real-time updates or triggering actions based on field values.

```tsx
// FirstNameWatched is a component that needs to watch the firstName field
function FirstNameWatched({ control }: { control: Control<FormInputs> }) {
  const firstName = useWatch({
    control,
    name: "firstName",
  })

  return <p>Watch: {firstName}</p>
}

export default function App() {
  ... // same setup as before
  
  return (
    <ThemeProvider theme={theme}>
      <Form methods={methods} errors={formErrors} onSubmit={onSubmit}>
        <TextInputField name="firstName" />
        <TextInputField name="lastName" />
        
        <FirstNameWatched control={control} />
      </Form>
    </ThemeProvider>
  )
}
```

### Form Validation

You can validate each fields passing either `regex` or `validate` to any field that support it. Not all field supports `regex` for instance but all fields support `validate`.
In addition many field support `required`, `minLength`, `maxLength`, `min`, and `max` validation.

#### Native Validation

```tsx
<TextInputField 
  name="firstName" 
  required
  minLength={2}
  maxLength={30}
/>
```

#### With Validate

```tsx
const EXISTING_IPS = ['192.168.1.1']

<TextInputField 
  name="ip" 
  validate={{
  ipAlreadyExists: (ip: string) =>
    EXISTING_IPS.includes(ip) ? 'This ip is already in use' : undefined,
  }}
/>
```

#### With Regex

```tsx
<TextInputField 
  name="email"
  regex={[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/]}
/>
```

We all know regex can be tricky, so to help you with that we made [Scaleway Regex](https://github.com/scaleway/scaleway-lib/tree/main/packages/regex) library that contains a lot of useful regexes that you can use in your forms.
You can easily install it with:

```sh
pnpm add @scaleway/regex
```

You can then use it like this:

```tsx
import { email } from '@scaleway/regex'

<TextInputField 
  name="email"
  regex={[email]}
/>
```

Check all the available regexes in the [Scaleway Regex file](https://github.com/scaleway/scaleway-lib/blob/main/packages/regex/src/index.ts)

### Resolvers | Zod

You can use [Zod](https://zod.dev/) for validation by integrating it with `@ultraviolet/form`. First you will need to install Zod and the Zod resolver for React Hook Form:

```sh
pnpm add zod @hookform/resolvers
```


Here's how you can do it:

```tsx
import { ThemeProvider, theme  } from '@ultraviolet/themes'
import { Form, TextInputField } from '@ultraviolet/form'
import { useForm } from '@ultraviolet/form'
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

// Define your Zod schema for validation
const schema = z.object({
  firstName: z.string(),
  lastName: z.string(),
})

// Types are inferred from the Zod schema
type FormValues = z.infer<typeof schema>

// We define the initial values of the form
const INITIAL_VALUES: FormValues = {
  firstName: 'Marc',
  lastName: 'Scout',
} as const

export default function App() {
  const methods = useForm<FormValues>({
    defaultValues: INITIAL_VALUES,
    resolver: zodResolver(schema),
    mode: 'onChange',
  })
  
  const formErrors = {
    required: () => 'This field is required',
    // Add more error messages as needed for min, max, etc.
  }
  
  const onSubmit = async ({
    firstName,
    lastName,
  }: FormValues) => {
    // Add your form submission logic here
    console.log('Form submitted with values:', { firstName, lastName })
  }

  return (
    <ThemeProvider theme={theme}>
      <Form methods={methods} errors={formErrors} onSubmit={onSubmit}>
        <TextInputField name="firstName" />
        <TextInputField name="lastName" />
      </Form>
    </ThemeProvider>
  )
}
```

If you need more examples with other resolvers we invite you to check [React Hook Form Resolvers Documentation](https://github.com/react-hook-form/resolvers#quickstart)

## Documentation

Checkout our [documentation website](https://storybook.ultraviolet.scaleway.com/).
