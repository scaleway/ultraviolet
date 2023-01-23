import { SelectInput } from '..'
import { Template } from './Template.stories'

export const TimeError = Template.bind({})
TimeError.args = {
  name: 'time-error',
  time: true,
  error: 'this is an error',
  children: [
    <SelectInput.Option value="11">11:00</SelectInput.Option>,
    <SelectInput.Option value="12">12:00</SelectInput.Option>,
  ],
}
TimeError.parameters = {
  docs: {
    storyDescription: 'This shows how to use `time-error` on SelectInput',
  },
}
