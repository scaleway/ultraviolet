import type { Meta } from '@storybook/react'
import { ToggleGroupField } from '..'
import { Form } from '../..'
import { mockErrors } from '../../../mocks'

export default {
  component: ToggleGroupField,
  decorators: [
    ChildStory => (
      <Form
        initialValues={{ options: ['weekly-save'] }}
        onRawSubmit={data => {
          console.log('data', data)
        }}
        errors={mockErrors}
      >
        {ChildStory()}
      </Form>
    ),
  ],
  title: 'Form/Components/Fields/ToggleGroupField',
  args: {
    name: 'options',
    legend: 'Choose options:',
  },
} as Meta<typeof ToggleGroupField>

export { Playground } from './Playground.stories'
export { Direction } from './Direction.stories'
export { Error } from './Error.stories'
export { Helper } from './Helper.stories'
export { Required } from './Required.stories'
