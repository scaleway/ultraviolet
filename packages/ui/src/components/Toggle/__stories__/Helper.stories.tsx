import type { StoryFn } from '@storybook/react'
import { Toggle } from '..'

export const Helper: StoryFn = () => (
  <Toggle name="toggle" label="label for toggle" helper="helper" />
)

Helper.parameters = {
  docs: {
    storyDescription: 'Add an helper text using helper property.',
  },
}
