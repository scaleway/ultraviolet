import { ComponentStory } from '@storybook/react'
import RichSelect from '..'

export const Multi: ComponentStory<typeof RichSelect> = ({ ...props }) => (
  <RichSelect name="multi" isMulti {...props}>
    <RichSelect.Option value="a">Option A</RichSelect.Option>
    <RichSelect.Option value="b">Option B</RichSelect.Option>
    <RichSelect.Option value="c">Option C</RichSelect.Option>
    <RichSelect.Option value="d">Option D</RichSelect.Option>
    <RichSelect.Option value="e">Option E</RichSelect.Option>
    <RichSelect.Option value="f">Option F</RichSelect.Option>
  </RichSelect>
)

Multi.parameters = {
  docs: {
    storyDescription: 'This shows how to use `isMulti`on RichSelect.',
  },
}
