import type { Meta } from '@storybook/react'
import Text from '..'

export default {
  component: Text,
  parameters: {
    docs: {
      description: {
        component:
          'Text allows you to style your texts using some existing standards.',
      },
    },
  },
  title: 'Components/Fondation/Text',
} as Meta

export { Playground } from './Playground.stories'
export { Variants } from './Variants.stories'
export { Color } from './Color.stories'
export { As } from './As.stories'
export { Prominence } from './Prominence.stories'
export { Disabled } from './Disabled.stories'
export { Italic } from './Italic.stories'
export { Underline } from './Underline.stories'
export { OneLine } from './OneLine.stories'
