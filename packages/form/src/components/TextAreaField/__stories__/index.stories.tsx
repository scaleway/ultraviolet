import type { Meta } from '@storybook/react'
import { useForm } from 'react-hook-form'
import { TextAreaField } from '..'
import { Form } from '../..'
import { mockErrors } from '../../../mocks'

export default {
  component: TextAreaField,
  decorators: [
    ChildStory => {
      const methods = useForm({
        defaultValues: {
          textarea: 'A long time ago in a galaxy far, far away',
        },
      })

      return (
        <Form onSubmit={() => {}} errors={mockErrors} methods={methods}>
          <ChildStory />
        </Form>
      )
    },
  ],
  title: 'Form/Components/Fields/TextAreaField',
} as Meta

export { Playground } from './Playground.stories'
export { Required } from './Required.stories'
