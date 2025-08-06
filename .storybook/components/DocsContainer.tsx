import { Global, ThemeProvider } from '@emotion/react'
import type {
  DocsContainerProps as BaseContainerProps} from '@storybook/addon-docs/blocks';
import {
  DocsContainer as BaseContainer,
  Unstyled,
} from '@storybook/addon-docs/blocks'
import { consoleLightTheme as lightTheme } from '@ultraviolet/themes'
import type { ReactNode } from 'react'
import { cloneElement, isValidElement, useState } from 'react'
import { globalStyles } from './globalStyle'
import '@ultraviolet/fonts/fonts.css'
import { GlobalAlert, ThemeProvider as ThemeProviderUV } from '@ultraviolet/ui'

type ExtraProps = {
  /**
   * When a component is deprecated we can set this property to true
   */
  deprecated: boolean
  /**
   * When a component is deprecated we can why and by what to replace it
   */
  deprecatedReason: string
  /**
   * When a component is deprecated we can add a link to the migration guide
   */
  migrationLink: string
  /**
   * This prop, if set to true, will hide the args table where you have the props definition and controls
   */
  hideArgsTable?: boolean
  /**
   * This prop can be used to define if a component is being tested and not prod ready
   */
  experimental?: boolean
}

type DocsContainerProps = BaseContainerProps & {
  context?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    attachedCSFFiles: Set<any>
  }
} & { children: ReactNode }

const DocsContainer = ({ children, context }: DocsContainerProps) => {
  const [isBeta, setIsBeta] = useState(false)
  const scope = context?.attachedCSFFiles?.values()?.next()?.value?.meta
  const parameters = scope?.parameters

  const isPlusLibrary = scope?.title?.includes('Plus/') ?? false

  if (
    import.meta.env['STORYBOOK_ENVIRONMENT'] === 'production' &&
    window.location.hostname === 'storybook.ultraviolet.scaleway.com'
  ) {
    fetch('https://api.github.com/repos/scaleway/ultraviolet/branches/beta')
      .then((data) => {
        if (data.ok) {
          setIsBeta(true)
        }
      })
      .catch(() => {
        setIsBeta(false)
      })
  }

  return (
    <Unstyled>
      <ThemeProviderUV>
        <ThemeProvider theme={lightTheme}>
          {isBeta ?
          <GlobalAlert
            buttonText="Access to Beta"
            onClickButton={() => window.top?.location.assign('https://beta.storybook.ultraviolet.scaleway.com')}
            closable={false}
          >
            A Beta version is available. Please use this version if your dependencies include the Beta release.
          </GlobalAlert> : null}
          <Global styles={[globalStyles]} />
          <BaseContainer context={context}>
            {isValidElement<ExtraProps>(children)
              ? cloneElement(children, {
                  deprecated: parameters?.deprecated,
                  deprecatedReason: parameters?.deprecatedReason,
                  migrationLink: parameters?.migrationLink,
                  hideArgsTable: parameters?.hideArgsTable,
                  experimental: isPlusLibrary ? true : parameters?.experimental,
                })
              : children}
          </BaseContainer>
        </ThemeProvider>
      </ThemeProviderUV>
    </Unstyled>
  )
}

export default DocsContainer
