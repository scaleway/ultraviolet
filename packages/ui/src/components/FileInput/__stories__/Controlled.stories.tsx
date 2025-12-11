import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { FileInput } from '..'
import type { FilesType } from '../types'

export const Controlled: StoryFn<typeof FileInput> = () => {
  const [files, setFiles] = useState<FilesType[]>([])
  const onChange = (f: FilesType[]) => setFiles(f)

  return (
    <Stack direction="column" gap={3}>
      <FileInput
        defaultFiles={[]}
        label="type='dropzone'"
        multiple
        onChangeFiles={onChange}
        size="small"
        title="Click or drag file here"
        variant="dropzone"
      />
      <Text as="div" variant="body">
        Files:
        <ul>
          {files.map(file => (
            <li key={file.fileName}>{file.fileName}</li>
          ))}
        </ul>
      </Text>
    </Stack>
  )
}

Controlled.parameters = {
  docs: {
    description: {
      story:
        'The component can be controlled two ways: with the `onDrop` prop to catch the event or with `onChangeFiles` to get a more polished list of the added files.',
    },
  },
}
