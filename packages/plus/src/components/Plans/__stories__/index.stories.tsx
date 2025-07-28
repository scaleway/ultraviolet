import type { Meta } from '@storybook/react-vite'
import { Plans } from '..'

export default {
  component: Plans,
  title: 'Plus/Compositions/Plans',
} as Meta<typeof Plans>

export { HideLabels } from './HideLabels.stories'
export { Playground } from './Playground.stories'
export { Selectable } from './Selectable.stories'
export { WithIcon } from './WithIcon.stories'
