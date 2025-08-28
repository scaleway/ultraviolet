import type { Decorator, StoryFn } from '@storybook/react-vite'
import { Separator } from '..'

export const Direction: StoryFn<typeof Separator> = args => (
  <>
    <div style={{ marginRight: 8 }}>left part</div>
    <Separator {...args} />
    <div style={{ marginLeft: 8 }}>right part</div>
  </>
)

Direction.args = {
  direction: 'vertical',
}

Direction.decorators = [
  Story => (
    <div style={{ display: 'inline-flex' }}>
      <Story />
    </div>
  ),
] as Decorator[]
