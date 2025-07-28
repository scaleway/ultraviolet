import { dataGrouped } from './resources'
import { Template } from './Template.stories'

export const Multiselect = Template.bind({})

Multiselect.args = {
  ...Template.args,
  multiselect: true,
  options: dataGrouped,
  value: '',
}
Multiselect.decorators = [
  StoryComponent => (
    <div style={{ height: '80px' }}>
      <StoryComponent />
    </div>
  ),
]

Multiselect.parameters = {
  docs: {
    description: {
      story: '`multiselect` prop let the user selects more than one option.',
    },
  },
}
