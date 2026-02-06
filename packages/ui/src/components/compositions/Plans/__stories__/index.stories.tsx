import type { Meta } from '@storybook/react-vite'
import { Plans } from '..'

export default {
  component: Plans,
  title: 'compositions/Plans',
} as Meta<typeof Plans>

export { Playground } from './Playground.stories'
export { HideLabels } from './HideLabels.stories'
export { WithIcon } from './WithIcon.stories'
export { Selectable } from './Selectable.stories'
export { Highlight } from './Highlight.stories'
