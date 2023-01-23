import { SelectInput } from '..'
import { Template } from './Template.stories'

export const Required = Template.bind({})
Required.args = {
  name: 'required',
  required: true,
  children: [
    <SelectInput.Option value="a">Option A</SelectInput.Option>,
    <SelectInput.Option value="b">Option B</SelectInput.Option>,
  ],
}
Required.parameters = {
  docs: {
    storyDescription: 'This shows how to use `required` on SelectInput',
  },
}
