import type { Meta } from '@storybook/react'
import List from '..'

export default {
  component: List,
  parameters: {
    deprecated: true,
    deprecatedReason: 'This component is deprecated please use ListV2 instead.',
    docs: {
      description: {
        component: 'Display a list of your data.',
      },
    },
  },
  title: 'Components/Data Display/List',
} as Meta

export { Playground } from './Playground.stories'
export { EmptyText } from './EmptyText.stories'
export { AutoClose } from './AutoClose.stories'
export { Sorting } from './Sorting.stories'
export { RowVariants } from './RowVariants.stories'
export { Multiselect } from './Multiselect.stories'
export { Disabled } from './Disabled.stories'
export { Loading } from './Loading.stories'
export { TableVariant } from './TableVariant.stories'
export { ExplorerVariant } from './ExplorerVariant.stories'
export { Ref } from './Ref.stories'
export { PaginationData } from './PaginationData.stories'
export { PaginationPrefetchedData } from './PaginationPrefetchedData.stories'
export { PaginationLazyLoading } from './PaginationLazyLoading.stories'
export { Animated } from './Animated.stories'
