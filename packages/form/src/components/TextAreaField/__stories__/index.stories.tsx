import type { Meta } from '@storybook/react'
import { TextAreaField } from '..'
import { Form } from '../..'
import { mockErrors } from '../../../mocks'

export default {
  component: TextAreaField,
  decorators: [
    ChildStory => (
      <Form
        onRawSubmit={() => {}}
        errors={mockErrors}
        initialValues={{
          textarea: 'A long time ago in a galaxy far, far away',
        }}
      >
        {ChildStory()}
      </Form>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: 'A tags field',
      },
    },
  },
  title: 'Form/Components/Fields/TextAreaField',
} as Meta

export { Playground } from './Playground.stories'
export { Required } from './Required.stories'
