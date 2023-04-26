import type { ComponentStory } from '@storybook/react'
import { Text } from '../index'

export const Dir: ComponentStory<typeof Text> = () => (
  <>
    <strong>ltr</strong>
    <div style={{ marginBottom: 16, marginTop: 8, width: 500 }}>
      <Text as="div" variant="body" oneLine dir="ltr">
        This text is quite long. Lorem ipsum dolor sit amet, consectetur
        adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua.
      </Text>
    </div>
    <strong>rtl</strong>
    <div style={{ marginBottom: 16, marginTop: 8, width: 500 }}>
      <Text as="div" variant="body" oneLine dir="rtl">
        This text is quite long. Lorem ipsum dolor sit amet, consectetur
        adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua.
      </Text>
    </div>
    <strong>auto</strong>
    <div style={{ marginBottom: 16, marginTop: 8, width: 500 }}>
      <Text as="div" variant="body" oneLine dir="auto">
        This text is quite long. Lorem ipsum dolor sit amet, consectetur
        adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua.
      </Text>
    </div>
  </>
)

Dir.parameters = {
  docs: {
    description: {
      story:
        '`dir` prop will change the direction of the `...` when using `oneLine`',
    },
  },
}
