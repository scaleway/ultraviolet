import type { StoryFn } from '@storybook/react-vite'
import { PlusIcon, UploadIcon } from '@ultraviolet/icons'
import { Stack } from '../../Stack'
import { FileInput } from '..'

export const Disabled: StoryFn<typeof FileInput> = () => (
  <Stack direction="column" gap={2}>
    <FileInput
      disabled
      label="medium disabled"
      title="Drag and drop files to get started"
      variant="dropzone"
    >
      Only pay for the storage you use. For example, storing 100 GB of data will
      cost use monthly less than a cup of coffee.
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
      disabled
      label="small disabled"
      size="small"
      title="Click or drag file to this area to upload"
      variant="dropzone"
    />
  </Stack>
)
