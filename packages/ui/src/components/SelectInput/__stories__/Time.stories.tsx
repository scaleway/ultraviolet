import { SelectInput } from '..'
import { Template } from './Template.stories'

export const Time = Template.bind({})
Time.args = {
  name: 'time',
  time: true,
  children: [
    <SelectInput.Option value="11">11:00</SelectInput.Option>,
    <SelectInput.Option value="12">12:00</SelectInput.Option>,
  ],
}
Time.parameters = {
  docs: {
    storyDescription: 'This shows how to use `time` on SelectInput',
  },
}
