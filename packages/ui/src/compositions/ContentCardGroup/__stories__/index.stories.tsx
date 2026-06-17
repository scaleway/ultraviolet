import type { Meta } from '@storybook/react-vite'
import { ContentCardGroup } from '..'

export default {
  component: ContentCardGroup,
  title: 'Compositions/ContentCardGroup',
  subcomponents: { 'ContentCardGroup.Card': ContentCardGroup.Card },
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
export { Loading } from './Loading.stories'
export { Subtitle } from './Subtitle.stories'
export { Description } from './Description.stories'
export { Custom } from './Custom.stories'
export { WithRow } from './WithRow.stories'
export { WithLargeHeight } from './WithLargeHeight.stories'
