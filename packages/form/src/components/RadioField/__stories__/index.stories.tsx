import type { Meta } from '@storybook/react'
import { Form, RadioField } from '../..'
import { mockErrors } from '../../../mocks'

export default {
  component: RadioField,
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
        component: 'A radio field',
      },
    },
  },
  title: 'Form/Components/Fields/RadioField',
} as Meta

export { Playground } from './Playground.stories'
export { Checked } from './Checked.stories'
export { Disabled } from './Disabled.stories'
export { Required } from './Required.stories'
