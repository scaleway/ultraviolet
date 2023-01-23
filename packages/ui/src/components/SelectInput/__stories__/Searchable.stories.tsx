import { SelectInput } from '..'
import { Template } from './Template.stories'

export const Searchable = Template.bind({})
Searchable.args = {
  name: 'required',
  isSearchable: true,
  children: [
    <SelectInput.Option value="a">Option A</SelectInput.Option>,
    <SelectInput.Option value="b">Option B</SelectInput.Option>,
  ],
}
Searchable.parameters = {
  docs: {
    storyDescription: 'This shows how to use `isSearchable` on SelectInput.',
  },
}
