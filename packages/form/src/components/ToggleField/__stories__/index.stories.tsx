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

export { Playground } from './Playground.stories'
export { Checked } from './Checked.stories'
export { ActAsRadio } from './ActAsRadio.stories'
export { Disabled } from './Disabled.stories'
export { Required } from './Required.stories'
