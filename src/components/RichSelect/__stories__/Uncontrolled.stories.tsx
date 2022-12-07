import RichSelect from '..'
import { Template } from './Template.stories'

export const Uncontrolled = Template.bind({})
Uncontrolled.args = {
  name: 'uncontrolled',
  value: { label: 'Option A', value: 'a' },
  children: [
    <RichSelect.Option value="a">Option A</RichSelect.Option>,
    <RichSelect.Option value="b">Option B</RichSelect.Option>,
  ],
}
Uncontrolled.parameters = {
  docs: {
    storyDescription: 'This shows how to use Uncontrolled RichSelect.',
  },
}
