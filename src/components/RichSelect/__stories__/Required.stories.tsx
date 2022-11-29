import { ComponentStory } from '@storybook/react'
import RichSelect from '..'

export const Required: ComponentStory<typeof RichSelect> = ({ ...props }) => (
  <RichSelect name="required" required {...props}>
    <RichSelect.Option value="a">Option A</RichSelect.Option>
    <RichSelect.Option value="b">Option B</RichSelect.Option>
  </RichSelect>
)

Required.parameters = {
  docs: {
    storyDescription: 'This shows how to use `required` on RichSelect',
  },
}
