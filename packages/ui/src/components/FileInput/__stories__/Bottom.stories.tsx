import { FileInput } from '..'

import type { StoryFn } from '@storybook/react-vite'

export const Bottom: StoryFn<typeof FileInput> = args => (
  <FileInput
    bottom="As an helper"
    disabled={args.disabled}
    label="type='dropzone'"
    multiple
    size="small"
    title="Click or drag file here"
    variant="dropzone"
  />
)

Bottom.parameters = {
  docs: {
    description: {
      story:
        'Add content outside of the container using prop `bottom`. It usually is a helper or `FileInput.List`.',
    },
  },
}
