import type { Meta } from '@storybook/react'
import { CheckboxGroupField } from '..'
import { Form } from '../..'
import { mockErrors } from '../../../mocks'

export default {
  component: CheckboxGroupField,
  decorators: [
    ChildStory => (
      <Form
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
    name: 'template',
    label: 'Legend',
    value: ['value-2'],
  },
} as Meta<typeof CheckboxGroupField>

export { Playground } from './Playground.stories'
export { Direction } from './Direction.stories'
