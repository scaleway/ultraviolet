import { css } from '@emotion/react'
import { normalize } from '@ultraviolet/ui'
import {space, colors} from '../../packages/ui/src/theme'

export const globalStyles = css`
  ${normalize()}

  p {
    margin: 0;
  }

  h1 {
    margin: ${space['5']} 0;
  }

  h2, h3, h4, h5, h6 {
    margin: ${space['2']} 0 ${space['1']} 0;
  }

  .sb-anchor h1, .sb-anchor h2, .sb-anchor h3, .sb-anchor h4, .sb-anchor h5, .sb-anchor h6 {
    margin: inherit;
  }

  body {
      font-family: 'Inter', sans-serif;
      font-size: 16px;
      font-weight: 400;
      line-height: 24px;
      color: ${colors.neutral.text};
  }

  .toc-list-item::before {
    border-color: ${colors.primary.border} !important;
  }

  .toc-list-item.is-active-li>a {
    color: ${colors.primary.text} !important;
  }
`
