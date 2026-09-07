import type { Meta } from '@storybook/react-vite'
import { Plans } from '..'

export default {
  component: Plans,
  title: 'Compositions/Plans',
  parameters: {
    a11yStatus: {
      perceivable: undefined,
      operable: undefined,
      understandable: undefined,
      robust: undefined,
    },
    experimental: true,
  },
} as Meta<typeof Plans>

export { Playground } from './Playground.stories'
export { HideLabels } from './HideLabels.stories'
export { WithIcon } from './WithIcon.stories'
export { Selectable } from './Selectable.stories'
export { Highlight } from './Highlight.stories'
