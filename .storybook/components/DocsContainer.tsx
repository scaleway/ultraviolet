import {
  isValidElement,
  cloneElement,
  FunctionComponent,
  ReactNode,
} from 'react'
import {
  DocsContainer as BaseContainer,
  DocsContainerProps,
} from '@storybook/addon-docs'
import { useDarkMode } from 'storybook-dark-mode'
import { light, dark } from '../storybookThemes'
import { darkTheme } from '../../src'
import { ThemeProvider } from '@emotion/react'
import lightTheme from '../../src/theme'

const CustomBaseContainer = BaseContainer as unknown as FunctionComponent<
  DocsContainerProps & { children: ReactNode }
>

const DocsContainer: typeof CustomBaseContainer = ({ context, children }) => {
  const isDarkTheme = useDarkMode()
  const currentTheme = isDarkTheme ? darkTheme : lightTheme

  return (
    <ThemeProvider theme={currentTheme}>
      <CustomBaseContainer
        context={{
          ...context,
          storyById: (id: any) => {
            const storyContext = context.storyById(id)
            return {
              ...storyContext,
              parameters: {
                ...storyContext?.parameters,
                docs: {
                  theme: isDarkTheme ? dark : light,
                },
              },
            }
          },
        }}
      >
        {isValidElement(children)
          ? cloneElement(children, {
              deprecated: context.parameters?.deprecated,
              deprecatedReason: context.parameters?.deprecatedReason,
              migrationLink: context.parameters?.migrationLink,
            })
          : children}
      </CustomBaseContainer>
    </ThemeProvider>
  )
}

export default DocsContainer
