import type { StoryFn } from '@storybook/react-vite'
import { RebootIcon, SendIcon, UploadIcon } from '@ultraviolet/icons'
import type { Dispatch, RefObject, SetStateAction } from 'react'
import { useState } from 'react'
import { Button } from '../../Button'
import { Stack } from '../../Stack'
import { TextInput } from '../../TextInput'
import { FileInput } from '..'
import type { FilesType } from '../types'
import { promptInput, promptWrapper } from './styles.css'

const Prompt = ({
  inputRef,
  setFiles,
}: {
  inputRef: RefObject<HTMLInputElement | null>
  setFiles: Dispatch<SetStateAction<FilesType[]>>
}) => (
  <Stack className={promptWrapper} direction="column" gap="1.5" width="700px">
    <FileInput.List limit={3} prominence="strong" textLimit="See all" />
    <Stack direction="row" gap={0.5} width="fit-content">
      <Button
        onClick={() => inputRef.current?.click()}
        sentiment="neutral"
        size="medium"
      >
        <UploadIcon />
      </Button>
      <TextInput
        className={promptInput}
        helper="this is an helper"
        placeholder="Placeholder"
        size="medium"
      />
      <Button onClick={() => setFiles([])} sentiment="neutral" size="medium">
        <RebootIcon />
      </Button>
      <Button sentiment="primary" size="medium">
        <SendIcon />
      </Button>
    </Stack>
  </Stack>
)

export const Overlay: StoryFn<typeof FileInput> = args => {
  const [files, setFiles] = useState<FilesType[]>([])

  return (
    <Stack direction="column" gap={2}>
      <FileInput
        aria-label="label-2"
        disabled={args.disabled}
        title="Drop here"
        variant="overlay"
      >
        Some content (this is an overlay)
      </FileInput>
      <FileInput
        aria-label="prompt"
        defaultFiles={files}
        multiple
        onChangeFiles={newFiles => setFiles(newFiles)}
        title={
          <Stack
            alignItems="center"
            direction="row"
            gap={1}
            justifyContent="center"
          >
            <UploadIcon /> Drag file to this area to upload
          </Stack>
        }
        variant="overlay"
      >
        {(_, inputRef) => <Prompt inputRef={inputRef} setFiles={setFiles} />}
      </FileInput>
    </Stack>
  )
}

Overlay.parameters = {
  docs: {
    description: {
      story:
        'FileInput can be used as an overlay over any component. When a title is set, it replaces the children when dragging.',
    },
  },
}
