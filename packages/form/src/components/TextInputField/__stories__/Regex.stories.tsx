import { Stack } from '@scaleway/ui'
import type { Story } from '@storybook/react'
import type { ComponentProps } from 'react'
import { TextInputField } from '..'
import { Submit } from '../../Submit'

export const Regex: Story<ComponentProps<typeof TextInputField>> = args => (
  <Stack gap={1}>
    <TextInputField {...args} />
    <Submit>Submit</Submit>
  </Stack>
)

Regex.args = {
  name: 'Regex',
  regex: [/^[a-zA-Z]*$/],
}
