import type { Meta } from '@storybook/react-vite'
import { SwitchButton } from '..'

export default {
  component: SwitchButton,
  subcomponents: {
    'SwitchButton.Option': SwitchButton.Option,
  },
  title: 'Components/Action/SwitchButton',
} as Meta

export { Playground } from './Playground.stories'
export { Size } from './Size.stories'
export { Options } from './Options.stories'
export { Disabled } from './Disabled.stories'
export { WithIcon } from './WithIcon.stories'
export { Sentiment } from './Sentiment.stories'
export { OnChange } from './OnChange.stories'
export { UpdateChildren } from './UpdateChildren.stories'
