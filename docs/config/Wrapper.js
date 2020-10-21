import { Global, css } from '@emotion/core'
import { Normalize } from '@smooth-ui/core-em'
import { ThemeProvider } from 'emotion-theming'
import React from 'react'
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
        <Normalize />
        <Global styles={doczGlobalStyles} />
        {children}
      </>
    </ThemeProvider>
  )
}
