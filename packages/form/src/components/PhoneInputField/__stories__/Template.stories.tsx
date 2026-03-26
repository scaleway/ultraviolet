import { PhoneField } from '..'
import { Form } from '../..'
import { useForm } from '../../..'
import { mockErrors } from '../../../mocks'

import type { StoryFn } from '@storybook/react-vite'

export const Template: StoryFn<typeof PhoneField> = ({ ...args }) => (
  <Form errors={mockErrors} methods={useForm()} onSubmit={() => {}}>
    <PhoneField
      {...args}
      parseNumberErrorMessage="This doesn't appear to be a valid phone number."
    />
  </Form>
)

Template.args = {
  label: 'Phone Number',
  name: 'phone',
  placeholder: 'Enter your phone number',
  defaultCountry: 'FR',
}
