import { RichSelect } from '..'
import { Template } from './Template.stories'

export const Multi = Template.bind({})
Multi.args = {
  name: 'multi',
  isMulti: true,
  children: [
    <RichSelect.Option value="a">Option A</RichSelect.Option>,
    <RichSelect.Option value="b">Option B</RichSelect.Option>,
    <RichSelect.Option value="c">Option C</RichSelect.Option>,
    <RichSelect.Option value="d">Option D</RichSelect.Option>,
    <RichSelect.Option value="e">Option E</RichSelect.Option>,
    <RichSelect.Option value="f">Option F</RichSelect.Option>,
  ],
}
Multi.parameters = {
  docs: {
    storyDescription: 'This shows how to use `isMulti`on RichSelect.',
  },
}
