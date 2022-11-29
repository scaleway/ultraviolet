import { ComponentStory } from '@storybook/react'
import RichSelect from '..'

export const Uncontrolled: ComponentStory<typeof RichSelect> = ({
  ...props
}) => (
  <RichSelect
    isClearable
    disabled
    name="uncontrolled"
    value={{ label: 'Option A', value: 'a' }}
    {...props}
  >
    <RichSelect.Option value="a">Option A</RichSelect.Option>
    <RichSelect.Option value="b">Option B</RichSelect.Option>
  </RichSelect>
)
Uncontrolled.parameters = {
  docs: {
    storyDescription: 'This shows how to sur Uncontrolled RichSelect.',
  },
}
