import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '../../Stack'
import { Text } from '../index'

export const Dir: StoryFn<typeof Text> = args => (
  <Stack gap={2}>
    <div>
      <strong>ltr</strong>
      <Text {...args} as="div" variant="body" dir="ltr">
        This text is quite long. Lorem ipsum dolor sit amet, consectetur
        adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua.
      </Text>
    </div>
    <div>
      <strong>rtl</strong>
      <Text {...args} as="div" variant="body" dir="rtl">
        This text is quite long. Lorem ipsum dolor sit amet, consectetur
        adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua.
      </Text>
    </div>
    <div>
      <strong>auto</strong>
      <Text {...args} as="div" variant="body" dir="auto">
        This text is quite long. Lorem ipsum dolor sit amet, consectetur
        adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua.
      </Text>
    </div>
  </Stack>
)

Dir.parameters = {
  docs: {
    description: {
      story: '`dir` prop will change the direction of the text',
    },
  },
}
