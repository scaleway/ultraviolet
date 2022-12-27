import { Stack } from '@scaleway/ui'
import type { Story } from '@storybook/react'
import type { ComponentProps } from 'react'
import { TextBoxField } from '..'
import { Submit } from '../../Submit'

export const Regex: Story<ComponentProps<typeof TextBoxField>> = args => (
  <Stack gap={1}>
    <TextBoxField {...args} />
    <Submit>Submit</Submit>
  </Stack>
)

Regex.args = {
  name: 'Regex',
  regex: [/^[a-zA-Z]*$/],
}
