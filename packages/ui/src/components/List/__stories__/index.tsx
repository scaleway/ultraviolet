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

export { Playground } from './Playground'
export { EmptyText } from './EmptyText'
export { AutoClose } from './AutoClose'
export { Sorting } from './Sorting'
export { RowVariants } from './RowVariants'
export { Multiselect } from './Multiselect'
export { Disabled } from './Disabled'
export { Loading } from './Loading'
export { TableVariant } from './TableVariant'
export { ExplorerVariant } from './ExplorerVariant'
export { Ref } from './Ref'
export { PaginationData } from './PaginationData'
export { PaginationPrefetchedData } from './PaginationPrefetchedData'
export { PaginationLazyLoading } from './PaginationLazyLoading'
export { Animated } from './Animated'
