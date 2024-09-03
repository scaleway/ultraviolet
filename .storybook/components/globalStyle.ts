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

  body {
      font-family: 'Inter', sans-serif;
      font-size: 16px;
      font-weight: 400;
      line-height: 24px;
      color: ${lightTheme.colors.neutral.text};
  }

  h1 {
    color: ${lightTheme.colors.neutral.text};
    font-size: ${lightTheme.typography.headingLargeStronger.fontSize};
    font-family: ${lightTheme.typography.headingLargeStronger.fontFamily};
    font-weight: ${lightTheme.typography.headingLargeStronger.weight};
    letter-spacing: ${lightTheme.typography.headingLargeStronger.letterSpacing};
    line-height: ${lightTheme.typography.headingLargeStronger.lineHeight};
    text-transform: ${lightTheme.typography.headingLargeStronger.textCase};
    text-decoration: ${lightTheme.typography.headingLargeStronger.textDecoration};
    margin-bottom: ${lightTheme.space[4]};
  }

  h2 {
    color: ${lightTheme.colors.neutral.text};
    font-size: ${lightTheme.typography.headingStrong.fontSize};
    font-family: ${lightTheme.typography.headingStrong.fontFamily};
    font-weight: ${lightTheme.typography.headingStrong.weight};
    letter-spacing: ${lightTheme.typography.headingStrong.letterSpacing};
    line-height: ${lightTheme.typography.headingStrong.lineHeight};
    text-transform: ${lightTheme.typography.headingStrong.textCase};
    text-decoration: ${lightTheme.typography.headingStrong.textDecoration};
    padding-bottom: ${lightTheme.space[1]};
    border-bottom: 2px solid ${lightTheme.colors.neutral.borderStronger};
    margin-bottom: ${lightTheme.space[2]};
    margin-top: ${lightTheme.space[4]};
  }

  h3 {
    color: ${lightTheme.colors.neutral.text};
    font-size: ${lightTheme.typography.heading.fontSize};
    font-family: ${lightTheme.typography.heading.fontFamily};
    font-weight: ${lightTheme.typography.heading.weight};
    letter-spacing: ${lightTheme.typography.heading.letterSpacing};
    line-height: ${lightTheme.typography.heading.lineHeight};
    text-transform: ${lightTheme.typography.heading.textCase};
    text-decoration: ${lightTheme.typography.heading.textDecoration};
    margin-top: ${lightTheme.space[2]};
    margin-bottom: ${lightTheme.space[1]};
  }

  h4 {
    margin-top: ${lightTheme.space[2]};
    margin-bottom: ${lightTheme.space[1]};
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
`
