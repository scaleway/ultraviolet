import { Template } from './Template'

export const Clearable = Template.bind({})

Clearable.args = {
  label: 'Clearable',
  placeholder: 'MM-DD-YYYY',
  clearable: true,
}

Clearable.decorators = [
  StoryComponent => (
    <div style={{ height: '350px' }}>
      <StoryComponent />
    </div>
  ),
]
