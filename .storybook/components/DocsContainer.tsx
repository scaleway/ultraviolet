import React from 'react'
import { DocsContainer as BaseContainer } from '@storybook/addon-docs/blocks'
import { useDarkMode } from 'storybook-dark-mode'
import { themes } from '@storybook/theming'

const DocsContainer: typeof BaseContainer = props => {
  const dark = useDarkMode()

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
                theme: dark ? themes.dark : themes.light,
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
