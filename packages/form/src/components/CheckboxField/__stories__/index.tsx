import type { Meta } from '@storybook/react'
import { CheckboxField, Form } from '../..'
import { mockErrors } from '../../../mocks'

export default {
  component: CheckboxField,
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
        component: 'A checkbox field',
      },
    },
  },
  title: 'Form/Components/Fields/CheckboxField',
} as Meta

export { Playground } from './Playground'

export { Checked } from './Checked'

export { BooleanChecked } from './BooleanChecked'

export { Disabled } from './Disabled'

export { Required } from './Required'
