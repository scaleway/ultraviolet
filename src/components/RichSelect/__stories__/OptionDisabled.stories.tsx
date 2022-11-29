import { ComponentStory } from '@storybook/react'
import RichSelect from '..'

export const OptionDisabled: ComponentStory<typeof RichSelect> = ({
  ...props
}) => (
  <RichSelect
    inputId="test"
    labelId="test-label"
    name="option-disabled"
    {...props}
  >
    <RichSelect.Option value="a">Option A</RichSelect.Option>
    <RichSelect.Option value="b" disabled>
      Option B
    </RichSelect.Option>
  </RichSelect>
)
OptionDisabled.parameters = {
  docs: {
    storyDescription: 'This shows how to use `disabled` on RichSelect.Option.',
  },
}
