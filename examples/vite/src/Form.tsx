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

export const DemoForm = () => {
  const methods = useForm<FormValues>({
    defaultValues: {
      // number: 5,
      // text: 'test',
    },
  })

  const handleSubmit = (data: FormValues) => {
    console.log('Form submitted:', data)
  }

  return (
    <Form
      // @ts-expect-error we don't need all errors here
      errors={{
        required: () => 'field required',
        pattern: () => 'pattern',
        min: () => 'min',
        minLength: ({ minLength }) => `min ${minLength} characters`,
      }}
      methods={methods}
      onSubmit={handleSubmit}
    >
      <Stack gap="3" maxWidth="400px">
        <TextInputField<FormValues> name="name" minLength={3} label="Name" placeholder="Doe" required />
        <TextInputField<FormValues> name="firstname" minLength={3} label="FirstName" placeholder="John" required />
        <NumberInputField<FormValues> label="Number Input" name="number" min={10} placeholder="Enter a number" />
        <DateInputField<FormValues> label="Date Input" name="date" placeholder="YYYY-MM-DD" />
        <Button type="submit">Submit</Button>
      </Stack>
    </Form>
  )
}
