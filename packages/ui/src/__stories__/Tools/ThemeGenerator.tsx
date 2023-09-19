import { Form, TextInputField } from '@ultraviolet/form'
import { Stack } from '../../components/Stack'

const ThemeGenerator = () => (
  <Stack gap={4}>
    <Form
      onRawSubmit={() => {}}
      errors={{
        TOO_LOW: '',
        TOO_HIGH: '',
        MIN_LENGTH: '',
        MAX_LENGTH: '',
        REGEX: '',
        REQUIRED: '',
        MAX_DATE: '',
        MIN_DATE: '',
      }}
    >
      <TextInputField name="sentiment" label="Sentiment" />
    </Form>
  </Stack>
)

export default ThemeGenerator
