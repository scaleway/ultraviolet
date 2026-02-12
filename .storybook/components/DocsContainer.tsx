import type { DocsContainerProps as BaseContainerProps } from '@storybook/addon-docs/blocks'
import {
  DocsContainer as BaseContainer,
  Unstyled,
} from '@storybook/addon-docs/blocks'
import {
  consoleLightTheme as lightTheme,
  ThemeProvider as ThemeProviderUV,
} from '@ultraviolet/themes'
import type { ReactNode } from 'react'
import { cloneElement, isValidElement, useState } from 'react'
import '@ultraviolet/fonts/fonts.css'
// don't know how it's work today
import '../../packages/themes/dist/themes.css'
import { GlobalAlert } from '@ultraviolet/ui'
import { globalStyleStoryBook } from './globalStyle.css'

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
    // oxlint-disable-next-line typescript/no-explicit-any
    attachedCSFFiles: Set<any>
  }
} & { children: ReactNode }

const DocsContainer = ({ children, context }: DocsContainerProps) => {
  const [isBeta, setIsBeta] = useState(false)
  const scope = context?.attachedCSFFiles?.values()?.next()?.value?.meta
  const parameters = scope?.parameters

  // oxlint-disable-next-line typescript/no-unsafe-call
  const isPlusLibrary = scope?.title?.includes('Plus/') ?? false

  if (
    import.meta.env['STORYBOOK_ENVIRONMENT'] === 'production' &&
    window.location.hostname === 'storybook.ultraviolet.scaleway.com'
  ) {
    fetch('https://api.github.com/repos/scaleway/ultraviolet/branches/beta')
      .then(data => {
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
      <div className={globalStyleStoryBook}>
        <ThemeProviderUV theme={lightTheme}>
          {isBeta ? (
            <GlobalAlert
              buttonText="Access to Beta"
              closable={false}
              onClickButton={() =>
                window.top?.location.assign(
                  'https://beta.storybook.ultraviolet.scaleway.com',
                )
              }
            >
              A Beta version is available. Please use this version if your
              dependencies include the Beta release.
            </GlobalAlert>
          ) : null}
          <BaseContainer context={context}>
            {isValidElement<ExtraProps>(children)
              ? cloneElement(children, {
                  deprecated: parameters?.deprecated,
                  deprecatedReason: parameters?.deprecatedReason,
                  experimental: isPlusLibrary ? true : parameters?.experimental,
                  hideArgsTable: parameters?.hideArgsTable,
                  migrationLink: parameters?.migrationLink,
                })
              : children}
          </BaseContainer>
        </ThemeProviderUV>
      </div>
    </Unstyled>
  )
}

export default DocsContainer
