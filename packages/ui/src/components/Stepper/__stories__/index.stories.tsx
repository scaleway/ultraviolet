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

export { Playground } from './Playground.stories'
export { WithAnimation } from './WithAnimation.stories'
export { Interactive } from './Interactive.stories'
export { Separator } from './Separator.stories'
export { Disabled } from './Disabled.stories'
export { Example } from './Example.stories'
export { LongName } from './LongName.stories'
export { Children } from './Children.stories'
