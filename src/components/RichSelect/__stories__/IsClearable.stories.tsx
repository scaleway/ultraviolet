import RichSelect from '..'
import { Template } from './Template.stories'

export const IsClearable = Template.bind({})
IsClearable.args = {
  name: 'is-clearable',
  isClearable: true,
  value: { label: 'Option A', value: 'a' },
  children: [
    <RichSelect.Option value="a">Option A</RichSelect.Option>,
    <RichSelect.Option value="b">Option B</RichSelect.Option>,
  ],
}
IsClearable.parameters = {
  docs: {
    storyDescription: 'This shows how to sur Uncontrolled RichSelect.',
  },
}
