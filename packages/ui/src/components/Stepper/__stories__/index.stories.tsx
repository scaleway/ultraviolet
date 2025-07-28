import type { Meta } from '@storybook/react-vite'
import { Stepper } from '..'

export default {
  component: Stepper,
  decorators: [StoryComponent => <StoryComponent />],
  subcomponents: {
    'Stepper.Step': Stepper.Step,
  },
  title: 'Components/Navigation/Stepper',
} as Meta

export { Children } from './Children.stories'
export { Disabled } from './Disabled.stories'
export { Example } from './Example.stories'
export { Interactive } from './Interactive.stories'
export { LongName } from './LongName.stories'
export { Playground } from './Playground.stories'
export { Separator } from './Separator.stories'
export { WithAnimation } from './WithAnimation.stories'
