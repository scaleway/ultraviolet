import type { Meta } from '@storybook/react-vite'
import { OptionSelector } from '..'

export default {
  component: OptionSelector,
  title: 'Plus/Compositions/OptionSelector',
} satisfies Meta

export { Playground } from './Playground.stories'
export { OneOption } from './WithOneOption.stories'
export { DefaultValue } from './DefaultValue.stories'
export { Error } from './Error.stories'
export { Controlled } from './Controlled.stories'
