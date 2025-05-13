# Ultraviolet Form

[![npm version](https://badge.fury.io/js/%40ultraviolet%2Fform.svg)](https://badge.fury.io/js/%40ultraviolet%2Fform)

Ultraviolet Form is an extension of Ultraviolet UI including everything to build forms using React.
It is using [React Hook Form](https://react-hook-form.com/) under the hood.

## Get Started

```sh
$ pnpm add @ultraviolet/ui @ultraviolet/form @emotion/react @emotion/styled
```

### Usage

To use the library you need to put a `ThemeProvider` from `@emotion/react` with the theme that comes from `@ultraviolet/ui` then wrap all your fields inside a `Form`:

```tsx
import { ThemeProvider } from '@emotion/react'
import { Form, TextInputField } from '@ultraviolet/form'
import { theme } from '@ultraviolet/ui'
import { useForm } from '@ultraviolet/form'

export default function App() {
  const methods = useForm()
  return (
    <ThemeProvider theme={theme}>
      <Form methods={methods}>
        <TextInputField name="example" />
      </Form>
    </ThemeProvider>
  )
}
```

## Documentation

Checkout our [documentation website](https://storybook.ultraviolet.scaleway.com/).
