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
  title: 'Components/Fields/SelectableCardField',
} as Meta

export { Playground } from './Playground.stories'
export { Checked } from './Checked.stories'
export { Disabled } from './Disabled.stories'
export { Required } from './Required.stories'
