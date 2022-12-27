import RichSelect from '..'
import { Template } from './Template.stories'

export const LoadingDemo = Template.bind({})
LoadingDemo.args = {
  name: 'loading',
  isLoading: true,
  disabled: true,
  value: { label: 'Option A', value: 'a' },
  children: [
    <RichSelect.Option value="a">Option A</RichSelect.Option>,
    <RichSelect.Option value="b">Option B</RichSelect.Option>,
  ],
}
LoadingDemo.parameters = {
  docs: {
    storyDescription: 'This shows how to use `isLoading` on RichSelect',
  },
}
