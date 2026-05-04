import { useState } from 'react'

import { FileInput } from '..'
import { Button } from '../../Button'
import { Stack } from '../../Stack'

import type { FilesType } from '../types'
import type { StoryFn } from '@storybook/react-vite'

export const AllowDirectories: StoryFn<typeof FileInput> = args => {
  const [files, setFiles] = useState<FilesType[]>()

  return (
    <Stack direction="column" gap={3}>
      <FileInput
        bottom={<FileInput.List limit={5} textLimit="see more" />}
        disabled={args.disabled}
        label="type='dropzone'"
        multiple
        title="Click or drag file/folder here"
        variant="dropzone"
        allowDirectories
        onChangeFiles={setFiles}
      >
        {(_, inputRef) => (
          <>
            <Button onClick={() => inputRef.current?.click()}>
              Click to add
            </Button>
            Number of files: {files?.length ?? 0}
          </>
        )}
      </FileInput>
    </Stack>
  )
}

AllowDirectories.parameters = {
  docs: {
    description: {
      story:
        'With prop `allowFolders` enabled, the component can read all the files inside a directory being drag and dropped. When this prop is enabled, `multiple` is automatically set to true.',
    },
  },
}
