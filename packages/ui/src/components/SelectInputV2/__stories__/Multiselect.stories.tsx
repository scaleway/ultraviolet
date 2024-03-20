import { Template } from './Template.stories'
import { dataGrouped } from './resources'

export const Multiselect = Template.bind({})

Multiselect.args = {
  ...Template.args,
  options: dataGrouped,
  grouped: true,
  multiselect: true,
}
Multiselect.decorators = [
  StoryComponent => (
    <div style={{ height: '80px' }}>
      <StoryComponent />
    </div>
  ),
]
