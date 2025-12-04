# Ultraviolet NextJS

[![npm version](https://badge.fury.io/js/%40ultraviolet%2Fnextjs.svg)](https://badge.fury.io/js/%40ultraviolet%2Fui)

Ultraviolet JS is a utility package to make Ultraviolet UI work with NextJS. This package will guide you through the integration of Ultraviolet UI with Next.js [App Router](https://nextjs.org/docs/app).

### Get Started

```sh
pnpm add @ultraviolet/nextjs
```

In you NextJS project you can implement the following:

```tsx
// app/layout.tsx
import { consoleLightTheme } from '@ultraviolet/themes'
import { ThemeRegistry } from '@ultraviolet/nextjs'
import { Button } from '@ultraviolet/ui'
import { ReactNode } from 'react'
import '@ultraviolet/ui/styles'
import '@ultraviolet/themes/global' // For normalisation, not necessary

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry theme={consoleLightTheme}>
          {children}
          <Button variant="primary">Click Me</Button>
        </ThemeRegistry>
      </body>
    </html>
  )
}
```

### Limitations

- **Fonts**: Ultraviolet UI uses custom fonts that need to be imported separately. Make sure to import the fonts CSS file in your project's entry point:
```sh
pnpm add @ultraviolet/fonts
```

  then in you `GlobalStyle` file:
  
  ```tsx
  "use client"
  
  import '@ultraviolet/fonts/fonts.css'
  ```

## Documentation

Checkout our [documentation website](https://storybook.ultraviolet.scaleway.com/).

## Contributing

📝 You can participate in the development and [start contributing](/CONTRIBUTING.md) to it.
