import { EmptyState } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: EmptyState,
  title: 'UI/Data Display/EmptyState',
} as Meta<typeof EmptyState>

export { Playground } from './Playground.stories'
export { EmptyList } from './EmptyList.stories'
export { InATinySpace } from './InATinySpace.stories'
export { AnErrorOccurred } from './AnErrorOccurred.stories'
