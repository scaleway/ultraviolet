import { SelectInput } from '..'
import { Template } from './Template.stories'

export const NoLabel = Template.bind({})
NoLabel.args = {
  name: 'no-label',
  noTopLabel: true,
  children: [
    <SelectInput.Option value="a">Option A</SelectInput.Option>,
    <SelectInput.Option value="b">Option B</SelectInput.Option>,
  ],
}
NoLabel.parameters = {
  docs: {
    storyDescription: 'This shows how to use `noTopLabel` in SelectInput.',
  },
}
