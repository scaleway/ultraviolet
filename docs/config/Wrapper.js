import React from 'react'
import { Global, css } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'
// eslint-disable-next-line import/no-unresolved
import { theme } from 'scaleway-ui'

// eslint-disable-next-line
const doczGlobalStyles = css`
  body {
    overflow: auto !important;
  }
`

export default function Wrapper({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <>
        <Global styles={doczGlobalStyles} />
        {children}
      </>
    </ThemeProvider>
  )
}
