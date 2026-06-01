import type { StoryFn } from '@storybook/react-vite'
import { FileInput } from '..'
import { Separator } from '../../Separator'
import { Stack } from '../../Stack'
import { defaultFiles } from '../__mock__/mockFile'

export const List: StoryFn<typeof FileInput> = args => (
  <Stack direction="column" gap={3}>
    <FileInput
      bottom={<FileInput.List />}
      defaultFiles={defaultFiles}
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
      defaultFiles={defaultFiles}
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
      defaultFiles={defaultFiles}
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
