import { SelectInput } from '..'
import { Template } from './Template.stories'

export const Multi = Template.bind({})
Multi.args = {
  name: 'multi',
  isMulti: true,
  children: [
    <SelectInput.Option value="a">Option A</SelectInput.Option>,
    <SelectInput.Option value="b">Option B</SelectInput.Option>,
    <SelectInput.Option value="c">Option C</SelectInput.Option>,
    <SelectInput.Option value="d">Option D</SelectInput.Option>,
    <SelectInput.Option value="e">Option E</SelectInput.Option>,
    <SelectInput.Option value="f">Option F</SelectInput.Option>,
  ],
}
Multi.parameters = {
  docs: {
    storyDescription: 'This shows how to use `isMulti`on SelectInput.',
  },
}
