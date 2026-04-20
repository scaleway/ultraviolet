import { RichTextInput } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: RichTextInput,
  title: 'Compositions/RichTextInput',
} as Meta<typeof RichTextInput>

export { Playground } from './Playground.stories'
export { Disabled } from './Disabled.stories'
export { Success } from './Success.stories'
export { Error } from './Error.stories'
export { Helper } from './Helper.stories'
export { Rows } from './Rows.stories'
export { Examples } from './Examples.stories'
