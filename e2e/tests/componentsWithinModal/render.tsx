import {
  Form,
  SelectInputField,
  TextInputField,
  useForm,
} from '@ultraviolet/form'
import { Button, Modal, Stack, Text, TextInput } from '@ultraviolet/ui'
import { useState } from 'react'
import { mockErrors } from '../../mocks/mockErrors'

const Render = () => {
  const methods = useForm<{ lastName: ''; color: '' }>()
  const [firstName, setFirstName] = useState<string>()

  return (
    <Modal disclosure={<Button>Open Modal</Button>}>
      <Stack gap={1}>
        <TextInput
          label="First name"
          onChangeValue={setFirstName}
          value={firstName}
        />
        <div data-testid="input-value">{firstName}</div>

        <Form errors={mockErrors} onSubmit={() => {}} methods={methods}>
          <Stack gap={1}>
            <TextInputField
              name="lastName"
              label="Last name"
              control={methods.control}
            />
            <div data-testid="form-content">{methods.watch().lastName}</div>

            <SelectInputField
              name="color"
              label="Color"
              control={methods.control}
              options={[
                {
                  label: 'Red',
                  value: 'red',
                },
                {
                  label: 'Green',
                  value: 'green',
                },
                {
                  label: 'Blue',
                  value: 'blue',
                },
              ]}
              footer={
                <Modal disclosure={<Button>Open Nested Modal</Button>}>
                  <Text as="p" variant="body">
                    This is the nested modal
                  </Text>
                </Modal>
              }
            />
          </Stack>
        </Form>
      </Stack>
    </Modal>
  )
}
export default Render
