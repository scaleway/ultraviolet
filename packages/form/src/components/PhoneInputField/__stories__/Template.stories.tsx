import type { StoryFn } from '@storybook/react-vite'
import { PhoneInputField } from '..'
import { Form } from '../..'
import { useForm } from '../../..'
import { mockErrors } from '../../../mocks'

export const Template: StoryFn<typeof PhoneInputField> = ({ ...args }) => (
  <Form errors={mockErrors} methods={useForm()} onSubmit={() => {}}>
    <PhoneInputField {...args} parseNumberErrorMessage="This doesn't appear to be a valid phone number." />
  </Form>
)

Template.args = {
  label: 'Phone Number',
  name: 'phone',
  placeholder: 'Enter your phone number',
  defaultCountry: 'FR',
}
