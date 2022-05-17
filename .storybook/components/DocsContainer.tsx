import { DocsContainer as BaseContainer } from '@storybook/addon-docs/blocks'
import { useDarkMode } from 'storybook-dark-mode'
import { light, dark } from '../storybookThemes'
import { darkTheme } from '../../src'
import { ThemeProvider } from '@emotion/react'
import lightTheme from '../../src/theme'

const DocsContainer: typeof BaseContainer = (props: {
  context: {
    storyById: (arg0: any) => any
    parameters: Record<string, unknown>
  }
  children: any
}) => {
  const isDarkTheme = useDarkMode()
  const currentTheme = isDarkTheme ? darkTheme : lightTheme

  return (
    <ThemeProvider theme={currentTheme}>
      <BaseContainer
        context={{
          ...props.context,
          storyById: (id: any) => {
            const storyContext = props.context.storyById(id)
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
        {React.cloneElement(props.children, {
          deprecated: props.context.parameters.deprecated,
          deprecatedReason: props.context.parameters.deprecatedReason,
        })}
      </BaseContainer>
    </ThemeProvider>
  )
}

export default DocsContainer
