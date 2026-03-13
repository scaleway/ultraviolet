import type { StoryFn } from '@storybook/react-vite'
import { Tag } from '..'

export const KeyValue: StoryFn<typeof Tag> = args => <Tag {...args} />

KeyValue.args = {
  keyValue: { key: 'key', value: 'value' },
}
KeyValue.parameters = {
  docs: {
    description: {
      story:
        'Use the `keyValue` prop to make the tag display a custom, read-only key-value pair. When `keyValue` is defined, the tag does not accept children and cannot be copied or closed.',
    },
  },
}

KeyValue.decorators = [
  StoryComponent => (
    <div style={{ width: 'fit-content' }}>
      <StoryComponent />
    </div>
  ),
]
