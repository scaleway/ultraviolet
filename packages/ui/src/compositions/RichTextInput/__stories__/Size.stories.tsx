import { RichTextInput } from '..'
import { Stack } from '../../../components'

export const Size = () => (
  <Stack gap="2">
    <RichTextInput label="large" size="large" />
    <RichTextInput label="medium" size="medium" />
    <RichTextInput label="small" size="small" />
  </Stack>
)
