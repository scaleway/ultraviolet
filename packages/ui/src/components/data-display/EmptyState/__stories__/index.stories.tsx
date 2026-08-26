import type { Meta } from '@storybook/react-vite'
import { EmptyState } from '..'

export default {
  component: EmptyState,
  title: 'UI/Data Display/EmptyState',
  parameters: {
    a11yStatus: {
      perceivable: false,
      operable: false,
      understandable: false,
      robust: false,
    },
  },
} as Meta<typeof EmptyState>

export { Playground } from './Playground.stories'
export { EmptyList } from './EmptyList.stories'
export { InATinySpace } from './InATinySpace.stories'
export { AnErrorOccurred } from './AnErrorOccurred.stories'
