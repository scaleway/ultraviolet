import RichSelect from '..'
import { Template } from './Template.stories'

export const Searchable = Template.bind({})
Searchable.args = {
  name: 'required',
  isSearchable: true,
  children: [
    <RichSelect.Option value="a">Option A</RichSelect.Option>,
    <RichSelect.Option value="b">Option B</RichSelect.Option>,
  ],
}
Searchable.parameters = {
  docs: {
    storyDescription: 'This shows how to use `isSearchable` on RichSelect.',
  },
}
