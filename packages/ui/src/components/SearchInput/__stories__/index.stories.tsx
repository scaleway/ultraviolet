import { SearchInput } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: SearchInput,
  title: 'UI/Data Entry/SearchInput',
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
} as Meta<typeof SearchInput>

export { Playground } from './Playground.stories'
export { Shortcut } from './Shortcut.stories'
export { CustomShortcut } from './CustomShortcut.stories'
export { Standalone } from './Standalone.stories'
export { Disabled } from './Disabled.stories'
export { Error } from './Error.stories'
