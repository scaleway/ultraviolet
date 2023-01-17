import { RichSelect } from '..'
import { Template } from './Template.stories'

export const TimeError = Template.bind({})
TimeError.args = {
  name: 'time-error',
  time: true,
  error: 'this is an error',
  children: [
    <RichSelect.Option value="11">11:00</RichSelect.Option>,
    <RichSelect.Option value="12">12:00</RichSelect.Option>,
  ],
}
TimeError.parameters = {
  docs: {
    storyDescription: 'This shows how to use `time-error` on RichSelect',
  },
}
