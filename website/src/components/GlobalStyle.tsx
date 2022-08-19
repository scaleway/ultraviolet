import { Global, Theme, css } from '@emotion/react'
import { normalize } from 'polished'
import React from 'react'

const baseStyles = (theme: Theme) => css`
  ${normalize()}

  /* Fallback system fonts */
  @font-face {
    font-family: 'System';
    font-style: normal;
    font-weight: 400;
    src: local('.SFNSText-Regular'),
      local('.HelveticaNeueDeskInterface-Regular'), local('.LucidaGrandeUI'),
      local('Segoe UI'), local('Ubuntu'), local('Roboto-Regular'),
      local('DroidSans'), local('Tahoma');
  }
  @font-face {
    font-family: 'System';
    font-style: normal;
    font-weight: 500;
    src: local('.SFNSText-Medium'),
      local('.HelveticaNeueDeskInterface-MediumP4'), local('.LucidaGrandeUI'),
      local('Segoe UI Semibold'), local('Ubuntu Medium'), local('Roboto-Medium'),
      local('DroidSans-Bold'), local('Tahoma Bold');
  }
  @font-face {
    font-family: 'System';
    font-style: normal;
    font-weight: 700;
    src: local('.SFNSText-Bold'), local('.HelveticaNeueDeskInterface-Bold'),
      local('.LucidaGrandeUI'), local('Segoe UI Bold'), local('Ubuntu Bold'),
      local('Roboto-Bold'), local('DroidSans-Bold'), local('Tahoma Bold');
  }

  * {
    box-sizing: border-box;
  }

  html {
    box-sizing: border-box;
    line-height: 1.5;
    font-size: 16px;
    height: 100%;
    -webkit-tap-highlight-color: transparent;
    margin: 0;
  }

  body {
    background-color: ${theme.colors.neutral.backgroundWeak};
    color: ${theme.colors.neutral.text};
    font-family: ${theme.fonts.sansSerif};
    overflow-y: auto;
    height: 100%;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
  }

  input,
  textarea,
  select,
  button {
    font-family: ${theme.fonts.sansSerif};
  }

  button,
  html [type='button'],
  [type='reset'],
  [type='submit'] {
    appearance: none;
  }

  img,
  canvas,
  iframe,
  video,
  svg,
  select,
  textarea {
    max-width: 100%;
  }

  a {
    color: ${theme.colors.info.textWeak};
    text-decoration: none;
  }

  a:hover,
  a:focus,
  a:active {
    color: ${theme.colors.info.textWeak};
    text-decoration: underline;
  }

  p {
    margin: 0;
  }
`

const customTransitionAnimation = css`
  * {
    transition: background-color 500ms ease;
  }
`

const GlobalStyle = () => (
  <Global styles={[baseStyles, customTransitionAnimation]} />
)

export default GlobalStyle
