import type { Theme } from '@emotion/react'
import { Global, css } from '@emotion/react'
import { normalize } from '@scaleway/ui'

const baseStyles = (theme: Theme) => css`
  ${normalize()}

  html {
    height: 100%;
  }

  body {
    background-color: ${theme.colors.neutral.backgroundWeak};
    color: ${theme.colors.neutral.text};
    font-family: ${theme.typography.body.fontFamily};
  }

  a {
    color: ${theme.colors.info.text};
    text-decoration: none;
  }

  a:hover,
  a:focus,
  a:active {
    color: ${theme.colors.info.textHover};
    text-decoration: underline;
  }
`

const customTransitionAnimation = css`
  * {
    transition: all 500ms ease;
  }
`

const fonts = css`
  @font-face {
    font-family: 'Asap';
    font-style: normal;
    src: url('/fonts/asap/Asap-Regular.woff2') format('woff2');
    font-weight: 400;
    font-display: swap;
  }
  @font-face {
    font-family: 'Asap';
    font-style: normal;
    src: url('/fonts/asap/Asap-Medium.woff2') format('woff2');
    font-weight: 500;
    font-display: swap;
  }
  @font-face {
    font-family: 'Asap';
    font-style: normal;
    src: url('/fonts/asap/Asap-Bold.woff2') format('woff2');
    font-weight: 700;
    font-display: swap;
  }
  @font-face {
    font-family: 'JetBrains';
    font-style: normal;
    src: url('/fonts/jetbrains/JetBrainsMono-Regular.woff2') format('woff2');
    font-weight: 400;
    font-display: swap;
  }
`

const GlobalStyle = () => (
  <Global styles={[baseStyles, customTransitionAnimation, fonts]} />
)

export default GlobalStyle
