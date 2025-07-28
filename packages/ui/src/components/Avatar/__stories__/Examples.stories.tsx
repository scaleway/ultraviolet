import type { StoryFn } from '@storybook/react-vite'
import { LockIcon } from '@ultraviolet/icons'
import { useRef, useState } from 'react'
import { Stack } from '../../Stack'
import { Avatar } from '..'

export const Examples: StoryFn<typeof Avatar> = props => {
  const [image, setImage] = useState<string | undefined>(undefined)
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <Stack gap={1} direction="row" alignItems="center" {...props}>
        <Avatar variant="icon" shape="circle" sentiment="neutral" size="small">
          <LockIcon />
        </Avatar>
        Locked Profile
      </Stack>
      <Stack gap={1} direction="row" alignItems="start">
        {image ? (
          <Avatar
            variant="image"
            image={image}
            shape="square"
            upload
            onClick={() => inputRef?.current?.click()}
          />
        ) : (
          <Avatar
            variant="text"
            text="UV"
            shape="square"
            upload
            onClick={() => inputRef?.current?.click()}
          />
        )}
        <input
          type="file"
          ref={inputRef}
          style={{ display: 'none' }}
          onChange={event => {
            if (event.target.files) {
              setImage(URL.createObjectURL(event.target.files[0]))
            }
          }}
        />
        <Stack direction="column" alignItems="start">
          <p>
            <b>My Profile</b>
          </p>
          <small>
            Last profile picture update: {image ? 'just now' : '2 hours ago'}
          </small>
        </Stack>
      </Stack>
    </>
  )
}

Examples.parameters = {
  docs: {
    description: {
      story:
        'You can use the prop `upload` to display an overlay on hover. `upload` is a boolean prop, so you can just add it like `upload={true}`.\n\n **Note:** you will need to implement a behavior using `onClick` function in addition to decide what to do when the avatar is clicked.',
    },
  },
}

Examples.decorators = [
  Story => (
    <Stack gap={4} direction="column">
      <Story />
    </Stack>
  ),
]
