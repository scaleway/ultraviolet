import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '../../Stack'
import { Text } from '../index'

export const Placement: StoryFn<typeof Text> = args => (
  <Stack gap={2}>
    <div>
      <strong>start</strong>
      <Text {...args} as="div" placement="start" variant="body">
        This text is quite long. Lorem ipsum dolor sit amet, consectetur
        adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua.
      </Text>
    </div>
    <div>
      <strong>center</strong>
      <Text {...args} as="div" placement="center" variant="body">
        This text is quite long. Lorem ipsum dolor sit amet, consectetur
        adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua.
      </Text>
    </div>
    <div>
      <strong>right</strong>
      <Text {...args} as="div" placement="end" variant="body">
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
