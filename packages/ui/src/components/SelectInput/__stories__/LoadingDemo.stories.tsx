import { SelectInput } from '..'
import { Template } from './Template.stories'

export const LoadingDemo = Template.bind({})
LoadingDemo.args = {
  name: 'loading',
  isLoading: true,
  disabled: true,
  value: { label: 'Option A', value: 'a' },
  children: [
    <SelectInput.Option value="a">Option A</SelectInput.Option>,
    <SelectInput.Option value="b">Option B</SelectInput.Option>,
  ],
}
LoadingDemo.parameters = {
  docs: {
    storyDescription: 'This shows how to use `isLoading` on SelectInput',
  },
}
