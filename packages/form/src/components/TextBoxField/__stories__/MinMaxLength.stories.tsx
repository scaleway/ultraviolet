import { Stack } from '@scaleway/ui'
import type { Story } from '@storybook/react'
import type { ComponentProps } from 'react'
import { TextBoxField } from '..'
import { Submit } from '../../Submit'

export const MinMaxLength: Story<
  ComponentProps<typeof TextBoxField>
> = args => (
  <Stack gap={1}>
    <TextBoxField {...args} />
    <Submit>Submit</Submit>
  </Stack>
)

MinMaxLength.args = {
  maxLength: 15,
  minLength: 10,
  name: 'Min/max length',
}
