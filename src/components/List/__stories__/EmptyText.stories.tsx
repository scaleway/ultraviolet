import { Template } from './Template.stories'

export const EmptyText = Template.bind({})

EmptyText.args = {
  emptyListComponent: (
    <div>This list is empty and display a custom component.</div>
  ),
  data: [],
}
