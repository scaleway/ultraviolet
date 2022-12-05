import RichSelect from '..'
import { Template } from './Template.stories'

export const NoLabel = Template.bind({})
NoLabel.args = {
  name: 'no-label',
  noTopLabel: true,
  children: [
    <RichSelect.Option value="a">Option A</RichSelect.Option>,
    <RichSelect.Option value="b">Option B</RichSelect.Option>,
  ],
}
NoLabel.parameters = {
  docs: {
    storyDescription: 'This shows how to use `noTopLabel` in RichSelect.',
  },
}
