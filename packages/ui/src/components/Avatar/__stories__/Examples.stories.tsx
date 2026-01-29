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
      <Stack alignItems="center" direction="row" gap={1} {...props}>
        <Avatar sentiment="neutral" shape="circle" size="small" variant="icon">
          <LockIcon />
        </Avatar>
        Locked Profile
      </Stack>
      <Stack alignItems="flex-start" direction="row" gap={1}>
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
        <Stack alignItems="flex-start" direction="column">
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
    <Stack direction="column" gap={4}>
      <Story />
    </Stack>
  ),
]
