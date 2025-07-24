import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { Submit, SubmitErrorAlert, useForm } from '../../..'
import { mockErrors } from '../../../mocks'
import { Form } from '../../Form'

export const Playground: StoryFn<
  ComponentProps<typeof SubmitErrorAlert>
> = () => {
  const methods = useForm()

  return (
    <Form
      errors={mockErrors}
      onSubmit={() => 'An error occurred'}
      methods={methods}
    >
      <Stack gap={1}>
        <SubmitErrorAlert />
        <Submit>Click Me</Submit>
      </Stack>
    </Form>
  )
}
