import { Template } from './Template'

export const Disabled = Template.bind({})

Disabled.args = {
  disabled: true,
  label: 'Disabled',
}

Disabled.decorators = [
  StoryComponent => (
    <div style={{ height: '350px' }}>
      <StoryComponent />
    </div>
  ),
]
