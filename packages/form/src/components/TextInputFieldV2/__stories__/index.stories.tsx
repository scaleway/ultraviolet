import type { Meta } from '@storybook/react'
import { TextInputField } from '..'
import { Form } from '../..'
import { mockErrors } from '../../../mocks'

export default {
  component: TextInputField,
  decorators: [
    ChildStory => (
      <Form
        onRawSubmit={() => {}}
        errors={mockErrors}
        initialValues={{
          example: 'Text',
        }}
      >
        {ChildStory()}
      </Form>
    ),
  ],
  title: 'Form/Components/Fields/TextInputFieldV2',
} as Meta

export { Playground } from './Playground.stories'
export { Required } from './Required.stories'
