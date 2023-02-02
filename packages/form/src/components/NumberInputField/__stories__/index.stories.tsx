import type { Meta } from '@storybook/react'
import { Form, NumberInputField } from '../..'
import { mockErrors } from '../../../mocks'

export default {
  component: NumberInputField,
  decorators: [
    ChildStory => (
      <Form onRawSubmit={() => {}} errors={mockErrors}>
        {ChildStory()}
      </Form>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: 'A NumberInput field',
      },
    },
  },
  title: 'Form/Components/Fields/NumberInputField',
} as Meta

export { Playground } from './Playground.stories'
export { Disabled } from './Disabled.stories'
export { Required } from './Required.stories'
