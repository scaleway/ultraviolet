import type { StoryFn } from '@storybook/react'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { TextInputField } from '..'
import { Submit } from '../../Submit'

export const Regex: StoryFn<ComponentProps<typeof TextInputField>> = args => (
  <Stack gap={1}>
    <TextInputField {...args} />
    <Submit>Submit</Submit>
  </Stack>
)

Regex.args = {
  name: 'value',
  regex: [/^[a-zA-Z]*$/],
  notice: 'Current regex: /^[a-zA-Z]*$/',
}
