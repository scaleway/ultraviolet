import type { StoryFn } from '@storybook/react-vite'
import { FileInput } from '..'
import { Stack } from '../../Stack'
import { defaultFiles } from '../__mock__/mockFile'

export const Multiple: StoryFn<typeof FileInput> = args => (
  <Stack direction="column" gap={3}>
    <FileInput
      bottom={<FileInput.List />}
      defaultFiles={[defaultFiles[0]]}
      disabled={args.disabled}
      label="Multiple"
      multiple
      size="small"
      title="Click or drag file here"
      variant="dropzone"
    />
    <FileInput
      bottom={<FileInput.List />}
      defaultFiles={[defaultFiles[0]]}
      disabled={args.disabled}
      label="Not multiple (default behavior)"
      size="small"
      title="Click or drag file here"
      variant="dropzone"
    />
  </Stack>
)

Multiple.parameters = {
  docs: {
    description: {
      story: 'It is possible to add mutliple files when using prop `multiple`.',
    },
  },
}
