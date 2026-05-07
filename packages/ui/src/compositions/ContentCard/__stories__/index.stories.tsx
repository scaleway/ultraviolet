import { ContentCard } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: ContentCard,
  title: 'Compositions/ContentCard',
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
} as Meta

export { Playground } from './Playground.stories'
export { Directions } from './Directions.stories'
export { Loading } from './Loading.stories'
export { Disabled } from './Disabled.stories'
export { Link } from './Link.stories'
export { Click } from './Click.stories'
export { Examples } from './Examples.stories'
