import { ComponentStory } from '@storybook/react'
import RichSelect from '..'

export const MultiDisabled: ComponentStory<typeof RichSelect> = ({
  ...props
}) => (
  <RichSelect
    name="multi-disabled"
    value={{ label: 'Option A', value: 'a' }}
    isMulti
    disabled
    {...props}
  >
    <RichSelect.Option value="a">Option A</RichSelect.Option>
    <RichSelect.Option value="b">Option B</RichSelect.Option>
  </RichSelect>
)

MultiDisabled.parameters = {
  docs: {
    storyDescription:
      'This shows how to use `disabled` on `isMulti` RichSelect.',
  },
}
