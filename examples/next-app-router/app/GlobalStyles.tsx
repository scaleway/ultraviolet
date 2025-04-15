'use client'

import { Global, css } from '@emotion/react'
import { normalize } from '@ultraviolet/ui'

const styles = css`
  display: grid;
  grid-template-rows: 20px 1fr 20px;
  align-items: center;
  justify-items: center;
  min-height: 100svh;
  padding: 80px;
  grid-gap: 64px;
  gap: 64px;
`

export const GlobalStyles = () => (
  <Global
    styles={css`
      ${normalize()}
      ${styles}
      `}
  />
)
