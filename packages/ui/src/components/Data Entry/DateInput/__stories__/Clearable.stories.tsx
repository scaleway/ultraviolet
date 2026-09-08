import { Template } from './Template'

export const Clearable = Template.bind({})

Clearable.args = {
  clearable: true,
  label: 'Clearable',
  placeholder: 'DD-MM-YYYY',
}

Clearable.decorators = [
  StoryComponent => (
    <div style={{ height: '350px' }}>
      <StoryComponent />
    </div>
  ),
]
