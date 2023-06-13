import type { StoryFn } from '@storybook/react'
import { Submit } from '..'
import { mockErrors } from '../../../mocks'
import { Form } from '../../Form'

export const Invalid: StoryFn = () => (
  <Form
    onRawSubmit={() => {}}
    errors={mockErrors}
    validate={() => ({ fake: 'error' })}
  >
    <Submit>This form is invalid</Submit>
  </Form>
)
