import { SearchInput } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: SearchInput,
  title: 'UI/Data Entry/SearchInput',
  parameters: {
    a11y: 'partial',
  },
} as Meta<typeof SearchInput>

export { Playground } from './Playground.stories'
export { Shortcut } from './Shortcut.stories'
export { CustomShortcut } from './CustomShortcut.stories'
export { Standalone } from './Standalone.stories'
export { Disabled } from './Disabled.stories'
export { Error } from './Error.stories'
