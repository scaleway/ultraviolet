import type { StoryFn } from '@storybook/react'
import { Submit } from '..'
import { mockErrors } from '../../../mocks'
import { Form } from '../../Form'
import { TextInputField } from '../../TextInputField'

export const Invalid: StoryFn = () => (
  <Form onRawSubmit={() => {}} errors={mockErrors}>
    <TextInputField required disabled name="invalid" />
    <Submit>This form is invalid</Submit>
  </Form>
)
