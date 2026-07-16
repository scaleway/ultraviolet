import { DateInputField, Form, NumberInputField, TextInputField, useForm } from '@ultraviolet/form'
import { Button, Stack } from '@ultraviolet/ui'
import '@ultraviolet/ui/styles'
import '@ultraviolet/themes/global'

type FormValues = {
  name: string
  firstname: string
  number: number | null
  date: Date | null
}

const mockFormErrors: import('@ultraviolet/form').FormErrors = {
  required: () => 'field required',
  pattern: () => 'pattern',
  min: () => 'min',
  max: () => 'max',
  minLength: ({ minLength }) => `min ${minLength} characters`,
  maxLength: ({ maxLength }) => `max ${maxLength} characters`,
  isInteger: () => 'should be an integer',
  isNumber: () => 'should be a number',
  minDate: () => 'min date',
  maxDate: () => 'max date',
}
export const DemoForm = () => {
  const methods = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      number: null,
    },
  })

  const handleSubmit = (data: FormValues) => {
    console.log('Form submitted:', data)
  }

  return (
    <Form errors={mockFormErrors} methods={methods} onSubmit={handleSubmit} _experimentalRegisterMode>
      <Stack gap="3" maxWidth="400px">
        <TextInputField<FormValues> name="name" minLength={3} label="Name" placeholder="Doe" required />
        <TextInputField<FormValues> name="firstname" minLength={3} label="FirstName" placeholder="John" required />
        <NumberInputField<FormValues>
          label="Number Input"
          name="number"
          min={10}
          placeholder="Enter a number"
          step="1"
        />
        <DateInputField<FormValues> label="Date Input" name="date" placeholder="YYYY-MM-DD" />
        <Button type="submit">Submit</Button>
      </Stack>
    </Form>
  )
}
