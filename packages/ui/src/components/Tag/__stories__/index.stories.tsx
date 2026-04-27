import { Tag } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: Tag,
  title: 'UI/Badges/Tag',
  parameters: {
    a11y: 'partial',
  },
} as Meta

export { Playground } from './Playground.stories'
export { Sentiments } from './Sentiments.stories'
export { Icons } from './Icons.stories'
export { OnClose } from './OnClose.stories'
export { Loading } from './Loading.stories'
export { Disabled } from './Disabled.stories'
export { Copiable } from './Copiable.stories'
export { Variant } from './Variant.stories'
export { LongTag } from './LongTag.stories'
export { KeyValue } from './KeyValue.stories'
