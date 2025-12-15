import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { Avatar } from '../../Avatar'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { FileInput } from '..'
import { hereText } from './styles.css'

export const Children: StoryFn<typeof FileInput> = args => {
  const [image, setImage] = useState<string | undefined>(undefined)

  return (
    <Stack direction="column" gap={2}>
      With inputId
      <FileInput
        aria-label="label"
        disabled={args.disabled}
        list
        title={inputId => (
          <label htmlFor={inputId}>Click here to add a file (title)</label>
        )}
        variant="dropzone"
      >
        {inputId => (
          <Stack>
            <Text
              as="label"
              htmlFor={inputId}
              sentiment="primary"
              variant="bodyStrong"
            >
              You can also click here (children)
            </Text>
            But not here
          </Stack>
        )}
      </FileInput>
      <FileInput
        aria-label="label-2"
        disabled={args.disabled}
        list
        title="drag here"
        variant="overlay"
      >
        {inputId => (
          <>
            Drag an drop on me or click{' '}
            <Text
              as="label"
              className={hereText}
              htmlFor={inputId}
              sentiment="info"
              variant="body"
            >
              here
            </Text>{' '}
            to add a file
          </>
        )}
      </FileInput>
      With inputRef
      <FileInput
        accept="image/*"
        aria-label="label"
        disabled={args.disabled}
        onChangeFiles={files => setImage(files[0].file)}
        title="dnd here"
        variant="overlay"
      >
        {(_, inputRef) =>
          image ? (
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
          )
        }
      </FileInput>
    </Stack>
  )
}
Children.parameters = {
  docs: {
    description: {
      story:
        'You can get the input id from the component if you want to use it on some other components, not just `FileInput.Button`. Simply use a label and `htmlFor`. You can also do it with the title. It is also possible to get the `ref` of the input the same way.',
    },
  },
}
