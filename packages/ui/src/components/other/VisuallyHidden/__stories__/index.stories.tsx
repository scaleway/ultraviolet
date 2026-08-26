import type { Meta } from '@storybook/react-vite'
import { VisuallyHidden } from '..'

export default {
  component: VisuallyHidden,
  title: 'UI/Other/VisuallyHidden',
  parameters: {
    a11yStatus: {
      perceivable: true,
      operable: true,
      understandable: true,
      robust: true,
    },
  },
} as Meta

export { Playground } from './Playground.stories'
export { As } from './Role.stories.tsx'
export { Example } from './Example.stories.tsx'
export { FocusableChildren } from './FocusableChildren.stories.tsx'
