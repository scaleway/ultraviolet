import { Template } from './Template'

export const Required = Template.bind({})

Required.args = {
  label: 'Required',
  required: true,
}
Required.decorators = [
  StoryComponent => (
    <div style={{ height: '400px' }}>
      <StoryComponent />
    </div>
  ),
]
