import { normalize } from '@ultraviolet/ui'
import { css } from '@emotion/react'
import lightTheme from '../../packages/ui/src/theme'

export const globalStyles = css`
  ${normalize()}

  p {
    margin: 0;
  }

  h1 {
    margin: ${lightTheme.space['5']} 0;
  }

  h2, h3, h4, h5, h6 {
    margin: ${lightTheme.space['2']} 0 ${lightTheme.space['1']} 0;
  }

  .sb-anchor h1, .sb-anchor h2, .sb-anchor h3, .sb-anchor h4, .sb-anchor h5, .sb-anchor h6 {
    margin: inherit;
  }

  body {
      font-family: 'Inter', sans-serif;
      font-size: 16px;
      font-weight: 400;
      line-height: 24px;
      color: ${lightTheme.colors.neutral.text};
  }

  .toc-list-item::before {
    border-color: ${lightTheme.colors.primary.border} !important;
  }

  .toc-list-item.is-active-li>a {
    color: ${lightTheme.colors.primary.text} !important;
  }
`
