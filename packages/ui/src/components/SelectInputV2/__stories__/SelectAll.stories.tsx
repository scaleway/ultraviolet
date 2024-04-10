import { Template } from './Template.stories'
import { dataGrouped } from './resources'

export const SelectAll = Template.bind({})

SelectAll.args = {
  ...Template.args,
  options: dataGrouped,
  selectAll: {
    label: 'Select All',
    description: 'You can click here to select every option',
  },
  multiselect: true,
}
SelectAll.decorators = [
  StoryComponent => (
    <div style={{ height: '80px' }}>
      <StoryComponent />
    </div>
  ),
]

SelectAll.parameters = {
  docs: {
    description: {
      story:
        'It will detect when the data is grouped and display the options accordingly',
    },
  },
}
