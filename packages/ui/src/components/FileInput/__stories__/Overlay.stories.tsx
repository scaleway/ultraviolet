import type { StoryFn } from '@storybook/react-vite'
import { useRef, useState } from 'react'
import { Avatar } from '../../Avatar'
import { Stack } from '../../Stack'
import { FileInput } from '..'

export const Overlay: StoryFn<typeof FileInput> = () => {
  const [image, setImage] = useState<string | undefined>(undefined)
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <Stack direction="row" gap={2}>
      <FileInput aria-label="label" variant="overlay">
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
