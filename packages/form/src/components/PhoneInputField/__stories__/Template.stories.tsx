import type { StoryFn } from '@storybook/react-vite'
import { PhoneInputField } from '..'

export const Template: StoryFn<typeof PhoneInputField> = ({ ...args }) => (
  <PhoneInputField {...args} parseNumberErrorMessage="This doesn't appear to be a valid phone number." />
)

Template.args = {
  label: 'Phone Number',
  name: 'phone',
  placeholder: 'Enter your phone number',
  defaultCountry: 'FR',
}
