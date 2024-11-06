import JetBrains from '../assets/fonts/jetbrains/JetBrainsMono-Regular.woff2'
import InterSemiBoldWoff2 from '../assets/fonts/inter/Inter-SemiBold.woff2'
import InterMediumWoff2 from '../assets/fonts/inter/Inter-Medium.woff2'
import InterRegularWoff2 from '../assets/fonts/inter/Inter-Regular.woff2'
import SpaceGrotesk from '../assets/fonts/space-grotesk/SpaceGrotesk.woff2'
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

  body {
      font-family: 'Inter', sans-serif;
      font-size: 16px;
      font-weight: 400;
      line-height: 24px;
      color: ${lightTheme.colors.neutral.text};
  }

  @font-face {
    font-family: 'Inter';
    font-style: normal;
    src: url(${InterRegularWoff2}) format('woff2');
    font-weight: 400;
    font-display: swap;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    src: url(${InterMediumWoff2}) format('woff2');
    font-weight: 500;
    font-display: swap;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    src: url(${InterSemiBoldWoff2}) format('woff2');
    font-weight: 600;
    font-display: swap;
  }
  @font-face {
    font-family: 'JetBrains';
    font-style: normal;
    src: url(${JetBrains}) format('woff2');
    font-weight: 400;
    font-display: swap;
  }
  @font-face {
    font-family: 'Space Grotesk';
    font-style: normal;
    src: url(${SpaceGrotesk}) format('woff2');
  }

  .toc-list-item::before {
    border-color: ${lightTheme.colors.primary.border} !important;
  }

  .toc-list-item.is-active-li>a {
    color: ${lightTheme.colors.primary.text} !important;
  }
`
