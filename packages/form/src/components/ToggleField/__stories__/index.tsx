import type { Meta } from '@storybook/react'
import { Form, ToggleField } from '../..'
import { mockErrors } from '../../../mocks'

export default {
  component: ToggleField,
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
  title: 'Form/Components/Fields/ToggleField',
} as Meta

export { Playground } from './Playground'
export { Checked } from './Checked'
export { ActAsRadio } from './ActAsRadio'
export { Disabled } from './Disabled'
export { Required } from './Required'
