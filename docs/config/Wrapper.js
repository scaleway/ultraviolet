import React from 'react'
import { Global, css } from '@emotion/core'

// eslint-disable-next-line
const doczGlobalStyles = css`
  body {
    overflow: auto !important;
  }
`

export default function Wrapper({ children }) {
  return (
    <>
      <Global styles={doczGlobalStyles} />
      {children}
    </>
  )
}
