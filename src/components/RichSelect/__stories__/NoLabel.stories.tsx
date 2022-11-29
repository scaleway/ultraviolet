import { ComponentStory } from '@storybook/react'
import RichSelect from '..'

export const NoLabel: ComponentStory<typeof RichSelect> = ({ ...props }) => (
  <RichSelect name="label" noTopLabel {...props}>
    <RichSelect.Option value="a">Option A</RichSelect.Option>
    <RichSelect.Option value="b">Option B</RichSelect.Option>
  </RichSelect>
)

NoLabel.parameters = {
  docs: {
    storyDescription: 'This shows how to use `noTopLabel` in RichSelect.',
  },
}
