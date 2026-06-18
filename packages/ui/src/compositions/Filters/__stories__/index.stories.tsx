import type { Meta } from '@storybook/react-vite'
import { Filters } from '../Filters'

export default {
  component: Filters,
  title: 'Compositions/Filters',
  parameters: {
    a11yStatus: 'partial',
    audit: {
      'keyboard-focus': false,
      'contrast-visuals': false,
      'semantics-screen-reader': false,
      'pointer-touch': false,
      'specific-patterns': false,
    },
  },
} as Meta

export { Playground } from './Playground.stories'
export { Layout } from './Layout.stories'
export { Dates } from './Dates.stories'
export { Context } from './Context.stories'
export { DynamicConfig } from './DynamicConfig.stories'
