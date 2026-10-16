import type { StoryFn } from '@storybook/react-vite'
import { Chip } from '..'

export const Closable: StoryFn<typeof Chip> = ({ ...args }) => (
  <Chip {...args} onClose={() => alert('Closed')} closeAccessibleLabel='Close chip "Content"'>
    Content
  </Chip>
)
Closable.parameters = {
  docs: {
    description: {
      story:
        'Use `onClose` to create a closable Chip. Use prop `closeAccessibleLabel` to add an explicit accessible label to the close button. Avoid generic labels such as "close", which can confuse the user and do not explicitly state which chip will be closed.',
    },
  },
}
