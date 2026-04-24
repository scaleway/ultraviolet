import { OfferList } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: OfferList,
  title: 'Compositions/OfferList',
  subcomponents: {
    OfferList,
    'OfferList.Row': OfferList.Row,
    'OfferList.Cell': OfferList.Cell,
  },
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
export { Type } from './Type.stories'
export { Expandable } from './Expandable.stories'
export { Loading } from './Loading.stories'
export { Banner } from './Banner.stories'
export { Badge } from './Badge.stories'
export { OnChange } from './OnChangeSelect.stories'
export { Example } from './Example.stories'
