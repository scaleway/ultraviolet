import type { StoryFn } from '@storybook/react'
import { Stack } from '../../Stack'
import { Text } from '../index'

export const Placement: StoryFn<typeof Text> = () => (
  <Stack gap={2}>
    <div>
      <strong>start</strong>
      <Text as="div" variant="body" placement="start">
        This text is quite long. Lorem ipsum dolor sit amet, consectetur
        adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua.
      </Text>
    </div>
    <div>
      <strong>center</strong>
      <Text as="div" variant="body" placement="center">
        This text is quite long. Lorem ipsum dolor sit amet, consectetur
        adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua.
      </Text>
    </div>
    <div>
      <strong>right</strong>
      <Text as="div" variant="body" placement="end">
        This text is quite long. Lorem ipsum dolor sit amet, consectetur
        adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua.
      </Text>
    </div>
  </Stack>
)

Placement.parameters = {
  docs: {
    description: {
      story: '`placement` prop will change the alignment of the text',
    },
  },
}
