import type { Meta } from '@storybook/react'
import { CheckboxGroupField } from '..'
import { Form } from '../..'
import { mockErrors } from '../../../mocks'

export default {
  component: CheckboxGroupField,
  decorators: [
    ChildStory => (
      <Form
        initialValues={{ conditions: 'termsAndConditions' }}
        onRawSubmit={data => {
          console.log('data', data)
        }}
        errors={mockErrors}
      >
        {ChildStory()}
      </Form>
    ),
  ],
  title: 'Components/Data Entry/CheckboxGroupField',
  args: {
    name: 'conditions',
    legend: 'Conditions',
  },
} as Meta<typeof CheckboxGroupField>

export { Playground } from './Playground.stories'
export { Direction } from './Direction.stories'
export { Helper } from './Helper.stories'
export { Error } from './Error.stories'
export { Required } from './Required.stories'
