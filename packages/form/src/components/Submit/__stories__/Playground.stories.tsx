import type { StoryFn } from '@storybook/react'
import type { ComponentProps } from 'react'
import { Submit } from '..'
import { mockErrors } from '../../../mocks'
import { Form } from '../../Form'

export const Playground: StoryFn<ComponentProps<typeof Submit>> = ({
  children,
  ...props
}) => (
  <Form onRawSubmit={() => {}} errors={mockErrors}>
    <Submit {...props}>This form is ready to submit</Submit>
  </Form>
)
