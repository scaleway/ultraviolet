import { Template } from './Template'

export const Disabled = Template.bind({})

Disabled.args = {
  label: 'Disabled',
  disabled: true,
}

Disabled.decorators = [
  StoryComponent => (
    <div style={{ height: '350px' }}>
      <StoryComponent />
    </div>
  ),
]
