import { SelectableCard } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: SelectableCard,
  title: 'UI/Data Entry/SelectableCard',
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
} as Meta<typeof SelectableCard>

export { Playground } from './Playground.stories'
export { Children } from './Children.stories'
export { Controlled } from './Controlled.stories'
export { Disabled } from './Disabled.stories'
export { Error } from './Error.stories'
export { ShowTick } from './ShowTick.stories'
export { Tooltip } from './Tooltip.stories'
export { Type } from './Type.stories'
export { Illustration } from './Illustration.stories'
export { Indented } from './Indented.stories'
export { Examples } from './Examples.stories'
