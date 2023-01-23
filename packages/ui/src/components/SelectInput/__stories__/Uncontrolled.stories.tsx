import { SelectInput } from '..'
import { Template } from './Template.stories'

export const Uncontrolled = Template.bind({})
Uncontrolled.args = {
  name: 'uncontrolled',
  value: { label: 'Option A', value: 'a' },
  children: [
    <SelectInput.Option value="a">Option A</SelectInput.Option>,
    <SelectInput.Option value="b">Option B</SelectInput.Option>,
  ],
}
Uncontrolled.parameters = {
  docs: {
    storyDescription: 'This shows how to use Uncontrolled SelectInput.',
  },
}
