import type { StoryFn } from '@storybook/react'
import { LockIcon } from '@ultraviolet/icons'
import { useRef, useState } from 'react'
import { AvatarV2 } from '..'
import { Stack } from '../../Stack'

export const Examples: StoryFn<typeof AvatarV2> = props => {
  const [image, setImage] = useState<string | undefined>(undefined)
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <Stack gap={1} direction="row" alignItems="center" {...props}>
        <AvatarV2
          variant="icon"
          shape="circle"
          sentiment="neutral"
          size="small"
        >
          <LockIcon />
        </AvatarV2>
        Locked Profile
      </Stack>
      <Stack gap={1} direction="row" alignItems="start">
        {image ? (
          <AvatarV2
            variant="image"
            image={image}
            shape="square"
            upload
            onClick={() => inputRef?.current?.click()}
          />
        ) : (
          <AvatarV2
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
