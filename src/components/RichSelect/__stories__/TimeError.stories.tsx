import { ComponentStory } from '@storybook/react'
import RichSelect from '..'

export const TimeError: ComponentStory<typeof RichSelect> = ({ ...props }) => (
  <RichSelect name="time-error" time error="this is an error" {...props}>
    <RichSelect.Option value="11">11:00</RichSelect.Option>
    <RichSelect.Option value="12">12:00</RichSelect.Option>
  </RichSelect>
)

TimeError.parameters = {
  docs: {
    storyDescription: 'This shows how to use `time-error` on RichSelect',
  },
}
