import type { Meta } from '@storybook/react-vite'
import { SelectInput } from '..'

export default {
  component: SelectInput,
  decorators: [
    StoryComponent => (
      <div style={{ marginBottom: 400 }}>
        <StoryComponent />
      </div>
    ),
  ],

  title: 'Components/Data Entry/SelectInput',
} as Meta<typeof SelectInput>

export { Controlled } from './Controlled.stories'
export { DropdownAlign } from './DropdownAlign.stories'
export { DropdownPortalTarget } from './DropdownPortalTarget.stories'
export { EmptyState } from './EmptyState.stories'
export { Footer } from './Footer.stories'
export { Grouped } from './Grouped.stories'
export { IsLoading } from './IsLoading.stories'
export { LoadMore } from './LoadMore.stories'
export { Modal } from './Modal.stories'
export { Multiselect } from './Multiselect.stories'
export { OnChange } from './OnChange.stories'
export { OnOpen } from './OnOpen.stories'
export { AdditionalInfo as OptionalInfo } from './OptionalInfo.stories'
export { Playground } from './Playground.stories'
export { Searchable } from './Searchable.stories'
export { SelectAll } from './SelectAll.stories'
