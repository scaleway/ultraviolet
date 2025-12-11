import type { StoryFn } from '@storybook/react-vite'
import { Separator } from '../../Separator'
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
  {
    error: 'Maximum file size exceeded',
    file: 'error.png',
    fileName: 'error_example.png',
    lastModified: 1,
    size: 4046000000,
    type: 'image/png',
  },
  {
    file: 'sound.mp3',
    fileName: 'sound.mp3',
    lastModified: 1,
    size: 30460,
    type: 'audio/mp3',
  },
  {
    file: 'doc.pdf',
    fileName: 'doc.pdf',
    lastModified: 1,
    size: 304600,
    type: 'application/pdf',
  },
  {
    file: 'video.mp4',
    fileName: 'video.mp4',
    lastModified: 1,
    size: 40460000,
    type: 'video/png',
  },
  {
    file: 'loading.pdf',
    fileName: 'loading_example.pdf',
    lastModified: 1,
    loading: true,
    size: 40460000,
    type: 'application/pdf',
  },
]
export const List: StoryFn<typeof FileInput> = () => (
  <Stack direction="column" gap={3}>
    <FileInput
      defaultFiles={defaultFile}
      label="type='dropzone'"
      list
      multiple
      size="small"
      title="Click or drag file here"
      variant="dropzone"
    />
    <Separator />
    <FileInput
      aria-label="label"
      defaultFiles={defaultFile}
      list
      listPosition="top"
      multiple
      variant="overlay"
    >
      Type &quot;ovelay&quot; (listPosition=&quot;top&quot;)
    </FileInput>
    <Separator />
    <FileInput
      aria-label="label"
      defaultFiles={defaultFile}
      list
      listPosition="bottom"
      multiple
      variant="overlay"
    >
      Type &quot;ovelay&quot; (listPosition=&quot;bottom&quot;)
    </FileInput>
  </Stack>
)

List.parameters = {
  docs: {
    description: {
      story:
        'With prop `list` it is possible to display all the drag&drop files added to the input. When using the FileInput as an overlay, it is possible to add the list on top or beneath the content using prop `listPosition`.',
    },
  },
}
