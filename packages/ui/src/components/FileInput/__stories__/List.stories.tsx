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
    type: 'video/mp4',
  },
  {
    file: 'loading.pdf',
    fileName: 'loading_example.pdf',
    lastModified: 1,
    loading: true,
    size: 40460000,
    type: 'application/pdf',
  },
  {
    error: 'Maximum file size exceeded',
    file: 'error.png',
    fileName: 'error_example.png',
    lastModified: 1,
    size: 4046000000,
    type: 'image/png',
  },
]
export const List: StoryFn<typeof FileInput> = args => (
  <Stack direction="column" gap={3}>
    <FileInput
      defaultFiles={defaultFile}
      disabled={args.disabled}
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
      disabled={args.disabled}
      list
      listPosition="top"
      multiple
      title="dnd here"
      variant="overlay"
    >
      Type &quot;ovelay&quot; (listPosition=&quot;top&quot;)
    </FileInput>
    <Separator />
    <FileInput
      aria-label="label"
      defaultFiles={defaultFile}
      disabled={args.disabled}
      list
      listPosition="bottom"
      multiple
      title="dnd here"
      variant="overlay"
    >
      Type &quot;ovelay&quot; (listPosition=&quot;bottom&quot;)
    </FileInput>
    <Separator />
    <FileInput
      defaultFiles={defaultFile}
      disabled={args.disabled}
      label="With prop listLimit"
      list
      listLimit={{ limit: 3, overflowText: 'See all' }}
      multiple
      size="small"
      title="Click or drag file here"
      variant="dropzone"
    />
  </Stack>
)

List.parameters = {
  docs: {
    description: {
      story:
        'With prop `list` it is possible to display all the drag&drop files added to the input. When using the FileInput as an overlay, it is possible to add the list on top or beneath the content using prop `listPosition`. Size is displayed and computed automatically from file.sie (number, in byte). It is also possible to add a limit to the number of visible files in the list using prop `listLimit`.',
    },
  },
}
