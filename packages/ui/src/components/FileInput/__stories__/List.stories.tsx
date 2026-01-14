import type { StoryFn } from '@storybook/react-vite'
import { Separator } from '../../Separator'
import { Stack } from '../../Stack'
import { FileInput } from '..'

const defaultFile = [
  {
    file: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Photo_Chat_Noir_et_blanc.jpg',
    fileName: 'cat.png',
    lastModified: 1,
    size: 30_460,
    type: 'image/png',
  },
  {
    file: 'sound.mp3',
    fileName: 'sound.mp3',
    lastModified: 1,
    size: 30_460,
    type: 'audio/mp3',
  },
  {
    file: 'doc.pdf',
    fileName: 'doc.pdf',
    lastModified: 1,
    size: 304_600,
    type: 'application/pdf',
  },
  {
    file: 'video.mp4',
    fileName: 'video.mp4',
    lastModified: 1,
    size: 40_460_000,
    type: 'video/mp4',
  },
  {
    file: 'loading.pdf',
    fileName: 'loading_example.pdf',
    lastModified: 1,
    loading: true,
    size: 40_460_000,
    type: 'application/pdf',
  },
  {
    error: 'Maximum file size exceeded',
    file: 'error.png',
    fileName: 'error_example.png',
    lastModified: 1,
    size: 4_046_000_000,
    type: 'image/png',
  },
]
export const List: StoryFn<typeof FileInput> = args => (
  <Stack direction="column" gap={3}>
    <FileInput
      bottom={<FileInput.List />}
      defaultFiles={defaultFile}
      disabled={args.disabled}
      label="type='dropzone'"
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
      multiple
      title="dnd here"
      variant="overlay"
    >
      Type &quot;ovelay&quot;
      <FileInput.List />
    </FileInput>
    <Separator />
    <FileInput
      bottom={<FileInput.List limit={3} textLimit="See all" />}
      defaultFiles={defaultFile}
      disabled={args.disabled}
      label="With prop listLimit"
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
        'With sub-component `FileInput.List` it is possible to display all the drag&drop files added to the input. The size of each file is displayed and computed automatically from file.size (number, in byte). It is also possible to add a limit to the number of visible files in the list using prop `limit` & `limitText` (text to put in the "see all" button). To work properly, the list needs the `FileInputProvider`, so it is only usable in the context of the FileInputComponent. Use prop `bottom` to add it outside the fileInput container.',
    },
  },
}
