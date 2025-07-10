import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { TextAreaField } from '..'
import { Submit } from '../../Submit'
import { Template } from './Template.stories'

export const SubmitOnEnter: StoryFn<
  ComponentProps<typeof TextAreaField>
> = args => (
  <Stack gap={1}>
    <TextAreaField {...args} />
    <Submit>Submit</Submit>
  </Stack>
)

SubmitOnEnter.args = { ...Template.args, required: true, submitOnEnter: true }

SubmitOnEnter.parameters = {
  docs: {
    description: {
      story:
        'Using `submitOnEnter` props, the form will be submitted when the user presses the `Enter` key. To add a carriage return, use `Shift + Enter`.',
    },
  },
}
