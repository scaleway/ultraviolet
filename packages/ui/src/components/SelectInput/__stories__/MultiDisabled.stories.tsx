import { SelectInput } from '..'
import { Template } from './Template.stories'

export const MultiDisabled = Template.bind({})
MultiDisabled.args = {
  name: 'multi-disabled',
  isMulti: true,
  disabled: true,
  value: { label: 'Option A', value: 'a' },
  children: [
    <SelectInput.Option value="a">Option A</SelectInput.Option>,
    <SelectInput.Option value="b">Option B</SelectInput.Option>,
  ],
}
MultiDisabled.parameters = {
  docs: {
    description: {
      story: 'This shows how to use `disabled` on `isMulti` SelectInput.',
    },
  },
}
