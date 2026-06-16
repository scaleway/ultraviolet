import type { Meta } from '@storybook/react-vite'
import { ContentCard } from '..'

export default {
  component: ContentCard,
  title: 'Compositions/ContentCard',
  parameters: {
    a11yStatus: {
      perceivable: false,
      operable: false,
      understandable: false,
      robust: false,
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
