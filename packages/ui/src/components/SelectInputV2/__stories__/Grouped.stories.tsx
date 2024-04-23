import { Template } from './Template.stories'
import { dataGrouped } from './resources'

export const Grouped = Template.bind({})

Grouped.args = { ...Template.args, options: dataGrouped }
Grouped.decorators = [
  StoryComponent => (
    <div style={{ height: '80px' }}>
      <StoryComponent />
    </div>
  ),
]

Grouped.parameters = {
  docs: {
    description: {
      story:
        'It will detect when the data is grouped and display the options accordingly',
    },
  },
}
