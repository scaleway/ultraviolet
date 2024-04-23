import type { Meta } from '@storybook/react'
import { SelectInputV2 } from '..'

export default {
  component: SelectInputV2,
  decorators: [
    StoryComponent => (
      <div style={{ marginBottom: 400 }}>
        <StoryComponent />
      </div>
    ),
  ],

  title: 'Components/Data Entry/SelectInputV2',
} as Meta<typeof SelectInputV2>

export { Playground } from './Playground.stories'
export { Grouped } from './Grouped.stories'
export { EmptyState } from './EmptyState.stories'
export { Multiselect } from './Multiselect.stories'
export { Footer } from './Footer.stories'
export { OnChange } from './OnChange.stories'
export { AdditionalInfo as OptionalInfo } from './OptionalInfo.stories'
export { LoadMore } from './LoadMore.stories'
export { IsLoading } from './IsLoading.stories'
export { SelectAll } from './SelectAll.stories'
