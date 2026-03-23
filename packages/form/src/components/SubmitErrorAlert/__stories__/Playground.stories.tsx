import { Stack } from '@ultraviolet/ui'

import { Submit, SubmitErrorAlert, useForm } from '../../..'
import { mockErrors } from '../../../mocks'
import { Form } from '../../Form'

import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'

export const Playground: StoryFn<
  ComponentProps<typeof SubmitErrorAlert>
> = () => {
  const methods = useForm()

  return (
    <Form
      errors={mockErrors}
      methods={methods}
      onSubmit={() => 'An error occurred'}
    >
      <Stack gap={1}>
        <SubmitErrorAlert />
        <Submit>Click Me</Submit>
      </Stack>
    </Form>
  )
}
