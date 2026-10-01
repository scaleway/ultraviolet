import type { Meta } from '@storybook/react-vite'
import { TagLink } from '..'

export default {
  component: TagLink,
  title: 'UI/Badges/TagLink',
  parameters: {
    a11yStatus: {
      perceivable: true,
      operable: true,
      understandable: true,
      robust: true,
    },
  },
} satisfies Meta<typeof TagLink>

export { Playground } from './Playground.stories'
export { Closable } from './Closable.stories'
export { Copiable } from './Copiable.stories'
export { Sentiment } from './Sentiment.stories'
export { Variant } from './Variant.stories'
export { Loading } from './Loading.stories'
