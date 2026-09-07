import type { Meta } from '@storybook/react-vite'
import { OptionSelector } from '..'

export default {
  component: OptionSelector,
  title: 'Compositions/OptionSelector',
  parameters: {
    a11yStatus: {
      perceivable: undefined,
      operable: undefined,
      understandable: undefined,
      robust: undefined,
    },
    experimental: true,
  },
} satisfies Meta

export { Playground } from './Playground.stories'
export { OneOption } from './WithOneOption.stories'
export { DefaultValue } from './DefaultValue.stories'
export { Error } from './Error.stories'
export { Controlled } from './Controlled.stories'
export { HideSecondSelector } from './HideSecondSelector.stories'
export { Direction } from './Direction.stories'
