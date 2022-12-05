import RichSelect from '..'
import { Template } from './Template.stories'

export const MultiDisabled = Template.bind({})
MultiDisabled.args = {
  name: 'multi-disabled',
  isMulti: true,
  disabled: true,
  value: { label: 'Option A', value: 'a' },
  children: [
    <RichSelect.Option value="a">Option A</RichSelect.Option>,
    <RichSelect.Option value="b">Option B</RichSelect.Option>,
  ],
}
MultiDisabled.parameters = {
  docs: {
    storyDescription:
      'This shows how to use `disabled` on `isMulti` RichSelect.',
  },
}
