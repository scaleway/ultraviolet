import React from 'react'
import { DocsContainer as BaseContainer } from '@storybook/addon-docs/blocks'
import { useDarkMode } from 'storybook-dark-mode'
import { light, dark } from '../storybookThemes'

const DocsContainer: typeof BaseContainer = props => {
  const isDarkTheme = useDarkMode()

  return (
    <BaseContainer
      context={{
        ...props.context,
        storyById: id => {
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
      {props.children}
    </BaseContainer>
  )
}

export default DocsContainer
