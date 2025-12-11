import type { StoryFn } from '@storybook/react-vite'
import { PlusIcon, UploadIcon } from '@ultraviolet/icons'
import { Button } from '../../Button'
import { Stack } from '../../Stack'
import { FileInput } from '..'

export const Template: StoryFn<typeof FileInput> = args => (
  <FileInput {...args} />
)

Template.args = {
  children: (
    <Stack direction="row" gap="2" justifyContent="center">
      <FileInput.Button sentiment="neutral" variant="outlined">
        <PlusIcon />
        Add folder
      </FileInput.Button>
      <Button sentiment="primary" variant="filled">
        <UploadIcon />
        Upload
      </Button>
    </Stack>
  ),
  helper: 'Helper',
  label: 'Label',
  title: 'Drag and drop files here',
}
