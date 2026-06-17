import type { Meta } from '@storybook/react-vite'
import { Plans } from '..'

export default {
  component: Plans,
  title: 'Compositions/Plans',
  parameters: {
    a11yStatus: {
      perceivable: false,
      operable: false,
      understandable: false,
      robust: false,
    },
    experimental: true,
  },
} as Meta<typeof Plans>

export { Playground } from './Playground.stories'
export { HideLabels } from './HideLabels.stories'
export { WithIcon } from './WithIcon.stories'
export { Selectable } from './Selectable.stories'
export { Highlight } from './Highlight.stories'
