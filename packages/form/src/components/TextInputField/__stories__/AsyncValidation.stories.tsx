import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { Submit } from '../../Submit'
import { SubmitErrorAlert } from '../../SubmitErrorAlert'
import { TextInputField } from '..'
import { Template } from './Template.stories'

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
