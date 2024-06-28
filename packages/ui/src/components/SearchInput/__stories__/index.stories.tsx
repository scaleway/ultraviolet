import type { Meta } from '@storybook/react'
import { SearchInput } from '..'

export default {
  component: SearchInput,
  title: 'Components/Data Entry/SearchInput',
} as Meta<typeof SearchInput>

export { Playground } from './Playground.stories'
export { Shortcut } from './Shortcut.stories'
export { Disabled } from './Disabled.stories'
export { Error } from './Error.stories'
