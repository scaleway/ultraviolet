import { isValidElement, cloneElement } from 'react'
import { DocsContainer as BaseContainer } from '@storybook/addon-docs'
import { useDarkMode } from 'storybook-dark-mode'
import { light, dark } from '../storybookThemes'
import { darkTheme } from '../../src'
import { ThemeProvider } from '@emotion/react'
import lightTheme from '../../src/theme'

const DocsContainer: typeof BaseContainer = ({ context, children }) => {
  const isDarkTheme = useDarkMode()
  const currentTheme = isDarkTheme ? darkTheme : lightTheme

  return (
    <ThemeProvider theme={currentTheme}>
      <BaseContainer
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
      </BaseContainer>
    </ThemeProvider>
  )
}

export default DocsContainer
