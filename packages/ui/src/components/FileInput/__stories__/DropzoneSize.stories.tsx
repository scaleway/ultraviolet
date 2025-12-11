import type { StoryFn } from '@storybook/react-vite'
import { PlusIcon, UploadIcon } from '@ultraviolet/icons'
import { Link } from '../../Link'
import { Stack } from '../../Stack'
import { FileInput } from '..'

export const DropzoneSize: StoryFn<typeof FileInput> = () => (
  <Stack direction="column" gap={2}>
    <FileInput
      label="medium"
      title="Drag and drop files to get started"
      variant="dropzone"
    >
      Only pay for the storage you use. For example, storing 100 GB of data will
      cost use monthly less than a cup of coffee.
      <Link href="" target="_blank">
        Object Storage pricing
      </Link>
      <Stack direction="row" gap="2" justifyContent="center">
        <FileInput.Button sentiment="neutral" variant="outlined">
          <PlusIcon />
          Add folder
        </FileInput.Button>
        <FileInput.Button sentiment="primary" variant="filled">
          <UploadIcon />
          Upload
        </FileInput.Button>
      </Stack>
    </FileInput>
    <FileInput
      label="small"
      size="small"
      title="Click or drag file to this area to upload"
      variant="dropzone"
    />
  </Stack>
)

DropzoneSize.parameters = {
  docs: {
    description: {
      story:
        'There are two sizes for the fileinput when variant="dropdzone" (default value). <br/> <strong>⚠️ When size="medium" (default value), do not forget to use `FileInput.Button` in order to add button to open the file explorer ! ⚠️</strong>',
    },
  },
}
