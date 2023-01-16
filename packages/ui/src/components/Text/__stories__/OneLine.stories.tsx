import type { ComponentStory } from '@storybook/react'
import { Text } from '../index'

export const OneLine: ComponentStory<typeof Text> = () => (
  <>
    <strong>Without ellipsis</strong>
    <div style={{ marginBottom: 16, marginTop: 8, width: 500 }}>
      <Text as="div" variant="body">
        This text is quite long. Lorem ipsum dolor sit amet, consectetur
        adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua.
      </Text>
    </div>
    <strong>With ellipsis (a tooltip is displayed on hover)</strong>
    <div style={{ marginBottom: 16, marginTop: 8, width: 500 }}>
      <Text as="div" variant="body" oneLine>
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
