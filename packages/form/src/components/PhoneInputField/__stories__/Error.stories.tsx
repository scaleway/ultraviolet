import { PhoneField } from '..'
import { Form } from '../..'
import { useForm } from '../../..'
import { mockErrors } from '../../../mocks'

import type { StoryFn } from '@storybook/react-vite'

export const WithError: StoryFn<typeof PhoneField> = () => {
  const methods = useForm({
    defaultValues: {
      phone: 'invalid',
    },
  })

  return (
    <Form errors={mockErrors} methods={methods} onSubmit={() => {}}>
      <PhoneField
        defaultCountry="FR"
        label="Phone Number"
        name="phone"
        parseNumberErrorMessage="This doesn't appear to be a valid phone number."
        required
      />
    </Form>
  )
}
