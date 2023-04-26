import type { Meta } from '@storybook/react'
import { Form, SelectableCardField } from '../..'
import { mockErrors } from '../../../mocks'

export default {
  component: SelectableCardField,
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
        component: 'A selectable card field',
      },
    },
  },
  title: 'Form/Components/Fields/SelectableCardField',
} as Meta

export { Playground } from './Playground'
export { Checked } from './Checked'
export { Disabled } from './Disabled'
export { Required } from './Required'
