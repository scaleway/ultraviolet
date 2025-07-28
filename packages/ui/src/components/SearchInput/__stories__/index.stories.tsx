import type { Meta } from '@storybook/react-vite'
import { SearchInput } from '..'

export default {
  component: SearchInput,
  title: 'Components/Data Entry/SearchInput',
} as Meta<typeof SearchInput>

export { CustomShortcut } from './CustomShortcut.stories'
export { Disabled } from './Disabled.stories'
export { Error } from './Error.stories'
export { Playground } from './Playground.stories'
export { Shortcut } from './Shortcut.stories'
export { Standalone } from './Standalone.stories'
