import { SelectInput } from '..'
import { Template } from './Template.stories'

export const IsClearable = Template.bind({})
IsClearable.args = {
  name: 'is-clearable',
  isClearable: true,
  value: { label: 'Option A', value: 'a' },
  children: [
    <SelectInput.Option key="a" value="a">
      Option A
    </SelectInput.Option>,
    <SelectInput.Option key="b" value="b">
      Option B
    </SelectInput.Option>,
  ],
}
IsClearable.parameters = {
  docs: {
    description: {
      story: 'This shows how to use `isClearable` on SelectInput.',
    },
  },
}
