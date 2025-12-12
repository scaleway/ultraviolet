import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '../../Stack'
import { FileInput } from '..'

const defaultFile = [
  {
    file: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Photo_Chat_Noir_et_blanc.jpg',
    fileName: 'cat.png',
    lastModified: 1,
    size: 30460,
    type: 'image/png',
  },
]
export const Multiple: StoryFn<typeof FileInput> = args => (
  <Stack direction="column" gap={3}>
    <FileInput
      defaultFiles={defaultFile}
      disabled={args.disabled}
      label="Multiple"
      list
      multiple
      size="small"
      title="Click or drag file here"
      variant="dropzone"
    />
    <FileInput
      defaultFiles={defaultFile}
      disabled={args.disabled}
      label="Not multiple (default behavior)"
      list
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
