import type { StoryFn } from '@storybook/react-vite'
import { PhoneInputField } from '..'
import { Form } from '../..'
import { useForm } from '../../..'
import { mockErrors } from '../../../mocks'

export const WithError: StoryFn<typeof PhoneInputField> = () => {
  const methods = useForm({
    defaultValues: {
      phone: 'invalid',
    },
  })

  return (
    <Form errors={mockErrors} methods={methods} onSubmit={() => {}}>
      <PhoneInputField
        defaultCountry="FR"
        label="Phone Number"
        name="phone"
        parseNumberErrorMessage="This doesn't appear to be a valid phone number."
        required
      />
    </Form>
  )
}
