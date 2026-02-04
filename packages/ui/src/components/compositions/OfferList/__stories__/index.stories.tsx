import type { Meta } from '@storybook/react-vite'
import { OfferList } from '..'

export default {
  component: OfferList,
  title: 'Compositions/OfferList',
  subcomponents: {
    OfferList,
    'OfferList.Row': OfferList.Row,
    'OfferList.Cell': OfferList.Cell,
  },
} satisfies Meta

export { Playground } from './Playground.stories'
export { Type } from './Type.stories'
export { Expandable } from './Expandable.stories'
export { Loading } from './Loading.stories'
export { Banner } from './Banner.stories'
export { Badge } from './Badge.stories'
export { OnChange } from './OnChangeSelect.stories'
export { Example } from './Example.stories'
