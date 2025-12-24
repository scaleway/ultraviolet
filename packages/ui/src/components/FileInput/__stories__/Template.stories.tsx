import type { StoryFn } from '@storybook/react-vite'
import { PlusIcon, UploadIcon } from '@ultraviolet/icons'
import { Stack } from '../../Stack'
import { FileInput } from '..'

export const Template: StoryFn<typeof FileInput> = args => (
  <FileInput {...args}>
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
)

Template.args = {
  helper: 'Helper',
  label: 'Label',
  title: 'Drag and drop files here',
}
