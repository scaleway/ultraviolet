import type { StoryFn } from '@storybook/react-vite'
import { Text } from '../index'
import { oneLineContainer } from './style.css'

export const OneLine: StoryFn<typeof Text> = args => (
  <>
    <strong>Without ellipsis</strong>
    <div className={oneLineContainer}>
      <Text {...args} as="div" variant="body">
        This text is quite long. Lorem ipsum dolor sit amet, consectetur
        adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua.
      </Text>
    </div>
    <strong>With ellipsis (a tooltip is displayed on hover)</strong>
    <div className={oneLineContainer}>
      <Text {...args} as="div" oneLine variant="body">
        This text is quite long. Lorem ipsum dolor sit amet, consectetur
        adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua.
      </Text>
    </div>
  </>
)

OneLine.parameters = {
  docs: {
    description: {
      story:
        ' `oneLine` prop will force text to be display on a single line by adding `...` after cropped text and will display a tooltip with full text when hovered.',
    },
  },
}
