import { SelectInput } from '..'
import { Template } from './Template.stories'

export const IsClearable = Template.bind({})
IsClearable.args = {
  name: 'is-clearable',
  isClearable: true,
  value: { label: 'Option A', value: 'a' },
  children: [
    <SelectInput.Option value="a">Option A</SelectInput.Option>,
    <SelectInput.Option value="b">Option B</SelectInput.Option>,
  ],
}
IsClearable.parameters = {
  docs: {
    storyDescription: 'This shows how to use `isClearable` on SelectInput.',
  },
}
