import { Global, Theme, css } from '@emotion/react'
import { normalize } from '@scaleway/ui'

const baseStyles = (theme: Theme) => css`
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
    transition: background-color 500ms ease;
  }
`

const GlobalStyle = () => (
  <Global styles={[baseStyles, customTransitionAnimation]} />
)

export default GlobalStyle
