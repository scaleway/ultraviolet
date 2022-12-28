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

export { Playground } from './Playground.stories'

export { Checked } from './Checked.stories'

export { BooleanChecked } from './BooleanChecked.stories'

export { Disabled } from './Disabled.stories'

export { Required } from './Required.stories'
