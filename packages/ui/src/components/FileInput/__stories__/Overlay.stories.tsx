import type { StoryFn } from '@storybook/react-vite'
import { RebootIcon, SendIcon, UploadIcon } from '@ultraviolet/icons'
import { useRef, useState } from 'react'
import { Avatar } from '../../Avatar'
import { Button } from '../../Button'
import { Stack } from '../../Stack'
import { TextInput } from '../../TextInput'
import { FileInput } from '..'
import { promptContainer, promptInput } from './styles.css'

const Prompt = ({ inputId }: { inputId: string }) => (
  <Stack
    className={promptContainer}
    direction="row"
    gap={0.5}
    width="fit-content"
  >
    <Button sentiment="neutral" size="medium">
      <label htmlFor={inputId}>
        <UploadIcon />
      </label>
    </Button>
    <TextInput
      className={promptInput}
      helper="this is an helper"
      placeholder="Placeholder"
      size="medium"
    />
    <Button sentiment="neutral" size="medium">
      <RebootIcon />
    </Button>
    <Button sentiment="primary" size="medium">
      <SendIcon />
    </Button>
  </Stack>
)

export const Overlay: StoryFn<typeof FileInput> = args => {
  const [image, setImage] = useState<string | undefined>(undefined)
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <Stack direction="column" gap={2}>
      Drag files in here to see the component
      <FileInput
        aria-label="label"
        disabled={args.disabled}
        title="dnd here"
        variant="overlay"
      >
        {image ? (
          <Avatar
            image={image}
            onClick={() => inputRef?.current?.click()}
            shape="square"
            upload
            variant="image"
          />
        ) : (
          <Avatar
            onClick={() => inputRef?.current?.click()}
            shape="square"
            text="UV"
            upload
            variant="text"
          />
        )}
        <input
          onChange={event => {
            if (event.target.files) {
              setImage(URL.createObjectURL(event.target.files[0]))
            }
          }}
          ref={inputRef}
          style={{ display: 'none' }}
          type="file"
        />
      </FileInput>
      <FileInput aria-label="label-2" title="Drop here" variant="overlay">
        Some content (this is also an overlay)
      </FileInput>
      <FileInput
        aria-label="prompt"
        list
        listPosition="top"
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
        {inputId => <Prompt inputId={inputId} />}
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
