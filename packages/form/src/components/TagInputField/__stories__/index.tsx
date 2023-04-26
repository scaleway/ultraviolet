import type { Meta } from '@storybook/react'
import { TagInputField } from '..'
import { Form } from '../..'
import { mockErrors } from '../../../mocks'

export default {
  component: TagInputField,
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
        component: 'A tags field',
      },
    },
  },
  title: 'Form/Components/Fields/TagInputField',
} as Meta

export { Playground } from './Playground'
export { Placeholder } from './Placeholder'
export { Disabled } from './Disabled'
export { DefaultTagInput } from './DefaultTagInput'
export { Required } from './Required'
