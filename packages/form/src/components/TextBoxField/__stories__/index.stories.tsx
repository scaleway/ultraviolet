import type { Meta } from '@storybook/react'
import { Form, TextBoxField } from '../..'
import { mockErrors } from '../../../mocks/mockErrors'

export default {
  component: TextBoxField,
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
        component: 'A switch field that act like a checkbox',
      },
    },
  },
  title: 'Form/Components/Fields/TextBoxField',
} as Meta

export { Playground } from './Playground.stories'
export { Disabled } from './Disabled.stories'
export { Required } from './Required.stories'
export { DynamicRequired } from './DynamicRequired.stories'
export { MinMaxLength } from './MinMaxLength.stories'
export { Regex } from './Regex.stories'
