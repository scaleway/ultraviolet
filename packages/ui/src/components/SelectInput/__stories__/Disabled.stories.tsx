import { SelectInput } from '..'
import { Template } from './Template.stories'

export const Disabled = Template.bind({})
Disabled.args = {
  name: 'disabled',
  disabled: true,
  value: { label: 'Option A', value: 'a' },
  children: [
    <SelectInput.Option value="a">Option A</SelectInput.Option>,
    <SelectInput.Option value="b">Option B</SelectInput.Option>,
  ],
}
Disabled.parameters = {
  docs: {
    storyDescription: 'This shows how to use `disabled` on SelectInput.',
  },
}
