import type { StoryFn } from '@storybook/react'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { TextInputField } from '..'
import { Submit } from '../../Submit'

export const MinMaxLength: StoryFn<
  ComponentProps<typeof TextInputField>
> = args => (
  <Stack gap={1}>
    <TextInputField {...args} />
    <Submit>Submit</Submit>
  </Stack>
)

MinMaxLength.args = {
  maxLength: 15,
  minLength: 10,
  name: 'Min/max length',
}
