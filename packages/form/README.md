# Scaleway Form

[![npm version](https://badge.fury.io/js/%40scaleway%2Fform.svg)](https://badge.fury.io/js/%40scaleway%2Fform)

Scaleway Form is an extension of Scaleway UI including everything to build forms using React.
It is using [React Final Form](https://final-form.org/react) under the hood.

## Installation

```sh
$ pnpm add @scaleway/form @emotion/react @emotion/styled
```

### Usage

To use the library you need to put a `ThemeProvider` from `@emotion/react` with the theme that comes from `@scaleway/ui` then wrap all your fields inside a `Form`:

```tsx
import { ThemeProvider } from '@emotion/react'
import { Form, TextInputField } from '@scaleway/form'
import { theme } from '@scaleway/ui'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Form>
        <TextInputField name="example" />
      </Form>
    </ThemeProvider>
  )
}
```

## Contribute

### Add a validator

- Create a file under `src/validators/` folder
- Export a default function with a type : (arg: unknown) => ValidatorObject
- Export it into `src/validators/index.ts`
- Add the key into the `ValidatorProps` type in `src/types.ts`
- Add tests into `src/validators/__tests__` folder

## Documentation

Checkout our [documentation website](https://storybook.ui.scaleway.com/).
