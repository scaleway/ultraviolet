import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { Submit } from '../../Submit'
import { KeyValueField } from '..'

export const Environnement: StoryFn<
  ComponentProps<typeof KeyValueField>
> = args => (
  <Stack gap={1}>
    <KeyValueField {...args} />
    <Submit>Submit</Submit>
  </Stack>
)

const HIDDEN_SECRET_VALUE = '************'
const alphanumDashUnderscoreDots = /^[a-zA-Z0-9-._]*$/

Environnement.args = {
  addButton: {
    maxSizeReachedTooltip: 'This is a tooltip when the max size is reached',
    name: 'Add an ENV variable',
    tooltip: 'This is a tooltip',
  },
  inputKey: {
    label: 'key',
    regex: [alphanumDashUnderscoreDots],
    required: true,
  },
  inputValue: {
    label: 'value',
    placeholder: HIDDEN_SECRET_VALUE,
    regex: [alphanumDashUnderscoreDots],
    required: true,
    type: 'password',
  },
  name: 'environnementVariables',
}
