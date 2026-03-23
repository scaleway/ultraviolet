import { Stack } from '@ultraviolet/ui'

import { TextInputField } from '..'
import { Submit } from '../../Submit'
import { SubmitErrorAlert } from '../../SubmitErrorAlert'

import { Template } from './Template.stories'

import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'

const emailValidate = {
  pattern: async (value: string) => {
    const res = await new Promise<string | true>(resolve => {
      setTimeout(() => {
        resolve(value.includes('@') ? true : `Email must have a @. ${value}`)
      }, 500)
    })

    return res
  },
}

export const AsyncValidation: StoryFn<
  ComponentProps<typeof TextInputField>
> = args => (
  <Stack gap={1}>
    <TextInputField {...args} validate={emailValidate} />
    <SubmitErrorAlert />
    <Submit>Submit</Submit>
  </Stack>
)

AsyncValidation.args = {
  ...Template.args,
  required: true,
}
