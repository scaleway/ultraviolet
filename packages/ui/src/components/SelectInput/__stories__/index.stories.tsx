import { SelectInput } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: SelectInput,
  decorators: [
    StoryComponent => (
      <div style={{ marginBottom: 400 }}>
        <StoryComponent />
      </div>
    ),
  ],

  title: 'UI/Data Entry/SelectInput',
  parameters: {
    a11y: 'partial',
  },
} as Meta<typeof SelectInput>

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
export { AddOption } from './AddOption.stories'
export { Controlled } from './Controlled.stories'
export { Modal } from './Modal.stories'
export { Searchable } from './Searchable.stories'
export { DropdownAlign } from './DropdownAlign.stories'
export { DropdownPortalTarget } from './DropdownPortalTarget.stories'
export { OnOpen } from './OnOpen.stories'
export { GroupData } from './GroupData.stories'
