import { RichSelect } from '..'
import { Template } from './Template.stories'

export const Disabled = Template.bind({})
Disabled.args = {
  name: 'disabled',
  disabled: true,
  value: { label: 'Option A', value: 'a' },
  children: [
    <RichSelect.Option value="a">Option A</RichSelect.Option>,
    <RichSelect.Option value="b">Option B</RichSelect.Option>,
  ],
}
Disabled.parameters = {
  docs: {
    storyDescription: 'This shows how to use `disabled` on RichSelect.',
  },
}
