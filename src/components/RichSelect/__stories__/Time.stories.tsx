import { ComponentStory } from '@storybook/react'
import RichSelect from '..'

export const Time: ComponentStory<typeof RichSelect> = ({ ...props }) => (
  <RichSelect name="time" time {...props}>
    <RichSelect.Option value="11">11:00</RichSelect.Option>
    <RichSelect.Option value="12">12:00</RichSelect.Option>
  </RichSelect>
)

Time.parameters = {
  docs: {
    storyDescription: 'This shows how to use `time` on RichSelect',
  },
}
