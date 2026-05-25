import type { StoryFn } from '@storybook/react-vite'
import { PhoneInputField } from '..'

export const WithError: StoryFn<typeof PhoneInputField> = () => (
  <PhoneInputField
    defaultCountry="FR"
    label="Phone Number"
    name="phone"
    parseNumberErrorMessage="This doesn't appear to be a valid phone number."
    required
  />
)
