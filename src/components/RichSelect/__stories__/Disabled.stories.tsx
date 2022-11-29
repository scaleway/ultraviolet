import { ComponentStory } from '@storybook/react'
import RichSelect from '..'

export const Disabled: ComponentStory<typeof RichSelect> = ({ ...props }) => (
  <RichSelect name="disabled" disabled value="a" {...props}>
    <RichSelect.Option value="a">Option A</RichSelect.Option>
    <RichSelect.Option value="b">Option B</RichSelect.Option>
  </RichSelect>
)
Disabled.parameters = {
  docs: {
    storyDescription: 'This shows how to use `disabled` on RichSelect.',
  },
}
