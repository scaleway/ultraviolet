import type { Story } from '@storybook/react'
import type { ComponentProps } from 'react'
import { TagInputField } from '..'
import { Submit } from '../../Submit'

export const Required: Story<ComponentProps<typeof TagInputField>> = args => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    <TagInputField {...args} />
    <Submit>Submit</Submit>
  </div>
)

Required.args = {
  name: 'required',
  required: true,
}
