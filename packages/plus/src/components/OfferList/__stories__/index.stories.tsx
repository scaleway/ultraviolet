import type { Meta } from '@storybook/react-vite'
import { OfferList } from '..'

export default {
  component: OfferList,
  title: 'Plus/Compositions/OfferList',
  subcomponents: {
    OfferList,
    'OfferList.Row': OfferList.Row,
    'OfferList.Cell': OfferList.Cell,
  },
} satisfies Meta

export { Badge } from './Badge.stories'
export { Banner } from './Banner.stories'
export { Example } from './Example.stories'
export { Expandable } from './Expandable.stories'
export { Loading } from './Loading.stories'
export { OnChange } from './OnChangeSelect.stories'
export { Playground } from './Playground.stories'
export { Type } from './Type.stories'
