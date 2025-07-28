import type { Meta } from '@storybook/react-vite'
import { ContentCardGroup } from '..'

export default {
  component: ContentCardGroup,
  subcomponents: { 'ContentCardGroup.Card': ContentCardGroup.Card },
  title: 'Plus/Compositions/ContentCardGroup',
} as Meta

export { Custom } from './Custom.stories'
export { Description } from './Description.stories'
export { Loading } from './Loading.stories'
export { Playground } from './Playground.stories'
export { Subtitle } from './Subtitle.stories'
export { WithLargeHeight } from './WithLargeHeight.stories'
export { WithRow } from './WithRow.stories'
