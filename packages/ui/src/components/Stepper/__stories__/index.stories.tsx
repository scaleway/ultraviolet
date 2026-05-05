import { Stepper } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: Stepper,
  decorators: [StoryComponent => <StoryComponent />],
  subcomponents: {
    'Stepper.Step': Stepper.Step,
  },
  title: 'UI/Navigation/Stepper',
  parameters: {
    a11y: 'partial',
    audit: {
      'keyboard-focus': false,
      'contrast-visuals': false,
      'semantics-screen-reader': false,
      'pointer-touch': false,
      'specific-patterns': false,
    },
  },
} as Meta

export { Playground } from './Playground.stories'
export { WithAnimation } from './WithAnimation.stories'
export { Interactive } from './Interactive.stories'
export { Separator } from './Separator.stories'
export { Disabled } from './Disabled.stories'
export { Example } from './Example.stories'
export { LongName } from './LongName.stories'
export { Children } from './Children.stories'
