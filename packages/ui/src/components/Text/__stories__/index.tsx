import type { Meta } from '@storybook/react'
import { Text } from '..'

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
  title: 'Components/Typography/Text',
} as Meta

export { Playground } from './Playground'
export { Variants } from './Variants'
export { Color } from './Color'
export { As } from './As'
export { Prominence } from './Prominence'
export { Disabled } from './Disabled'
export { Italic } from './Italic'
export { Underline } from './Underline'
export { OneLine } from './OneLine'
export { Dir } from './Dir'
