import RichSelect from '..'
import { Template } from './Template.stories'

export const Required = Template.bind({})
Required.args = {
  name: 'required',
  required: true,
  children: [
    <RichSelect.Option value="a">Option A</RichSelect.Option>,
    <RichSelect.Option value="b">Option B</RichSelect.Option>,
  ],
}
Required.parameters = {
  docs: {
    storyDescription: 'This shows how to use `required` on RichSelect',
  },
}
