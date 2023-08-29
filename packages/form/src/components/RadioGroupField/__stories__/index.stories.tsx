import type { Meta } from '@storybook/react'
import { Form, RadioGroupField } from '../..'
import { mockErrors } from '../../../mocks'

export default {
  component: RadioGroupField,
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
        component: 'A group of radios field',
      },
    },
  },
  title: 'Form/Components/Fields/RadioGroupField',
} as Meta

export { Playground } from './Playground.stories'
export { Error } from './Error.stories'
export { Helper } from './Helper.stories'
export { Direction } from './Direction.stories'
export { Required } from './Required.stories'
