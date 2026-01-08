import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { Submit } from '../../../Submit'
import { OptionSelectorField } from '..'
import { firstSelectorOptions, secondSelectorOptions } from './resources'

export const Required: StoryFn<
  ComponentProps<typeof OptionSelectorField>
> = args => (
  <Stack gap={1}>
    <OptionSelectorField
      {...args}
      firstSelector={{ options: firstSelectorOptions }}
      secondSelector={{ options: secondSelectorOptions }}
    />
    <Submit>Submit</Submit>
  </Stack>
)

Required.args = {
  label: 'This optionSelector is required',
  name: 'required-option-selector',
  required: true,
}
