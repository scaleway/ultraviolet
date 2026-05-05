import { SelectableCardOptionGroup } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: SelectableCardOptionGroup,
  title: 'UI/Data Entry/SelectableCardOptionGroup',
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
} as Meta<typeof SelectableCardOptionGroup>

export { Playground } from './Playground.stories'
export { Sizes } from './Sizes.stories'
export { Columns } from './Columns.stories'
export { Disabled } from './Disabled.stories'
export { Error } from './Error.stories'
export { Examples } from './Examples.stories'
