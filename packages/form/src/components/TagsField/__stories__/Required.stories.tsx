import type { Story } from '@storybook/react'
import type { ComponentProps } from 'react'
import { TagsField } from '..'
import { Submit } from '../../Submit'

export const Required: Story<ComponentProps<typeof TagsField>> = args => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    <TagsField {...args} />
    <Submit>Submit</Submit>
  </div>
)

Required.args = {
  name: 'required',
  required: true,
}
