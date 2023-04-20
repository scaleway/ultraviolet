import { SelectInput } from '..'
import { Template } from './Template.stories'

export const Playground = Template.bind({})

Playground.args = {
  ...Template.args,
  name: 'basic',
  value: { label: 'Option A', value: 'a' },
  children: [
    <SelectInput.Option value="a">Option A</SelectInput.Option>,
    <SelectInput.Option value="b">Option B</SelectInput.Option>,
  ],
}

Playground.decorators = [
  StoryComponent => (
    <div style={{ height: '80px' }}>
      <StoryComponent />
    </div>
  ),
]
