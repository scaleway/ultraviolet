import { Template } from './Template.stories'

export const Loading = Template.bind({})

Loading.args = {
  ...Template.args,
  isLoading: true,
  selectedIds: [],
  onSelectedIdsChange: () => {},
}
