import { ComponentStory } from '@storybook/react'
import RichSelect from '..'

export const Searchable: ComponentStory<typeof RichSelect> = ({ ...props }) => (
  <RichSelect name="searchable" isSearchable {...props}>
    <RichSelect.Option value="a">Option A</RichSelect.Option>
    <RichSelect.Option value="b">Option B</RichSelect.Option>
  </RichSelect>
)
Searchable.parameters = {
  docs: {
    storyDescription: 'This shows how to use `isSearchable` on RichSelect.',
  },
}
