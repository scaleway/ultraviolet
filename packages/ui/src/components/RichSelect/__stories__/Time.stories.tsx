import RichSelect from '..'
import { Template } from './Template.stories'

export const Time = Template.bind({})
Time.args = {
  name: 'time',
  time: true,
  children: [
    <RichSelect.Option value="11">11:00</RichSelect.Option>,
    <RichSelect.Option value="12">12:00</RichSelect.Option>,
  ],
}
Time.parameters = {
  docs: {
    storyDescription: 'This shows how to use `time` on RichSelect',
  },
}
