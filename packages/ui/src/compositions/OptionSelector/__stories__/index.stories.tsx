import { OptionSelector } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: OptionSelector,
  title: 'Compositions/OptionSelector',
  parameters: {
    a11y: 'partial',
    audit: {
      'keyboard-focus': false,
      'contrast-visuals': false,
      'semantics-screen-reader': false,
      'pointer-touch': false,
      'specific-patterns': false,
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
