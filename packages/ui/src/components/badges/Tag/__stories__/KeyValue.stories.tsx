import type { StoryFn } from '@storybook/react-vite'
import { Tag } from '..'
import { Stack } from '../../../layout/Stack'

export const KeyValue: StoryFn<typeof Tag> = args => {
  const { children, copyButton, keyValue, ...tagArgs } = args

  return (
    <Stack gap={1}>
      Default:
      <Tag {...args} />
      Closable: <Tag {...args} onClose={() => {}} />
      Copiable: <Tag {...args} copiable copyText="Copy" copiedText="Copied" />
      Closable & copiable: <Tag {...args} onClose={() => {}} copiable copyText="Copy" copiedText="Copied" />
      With overflow:
      <Tag
        keyValue={{
          key: 'key key key key key key key key key key',
          value: 'value value value value value value value',
        }}
        {...tagArgs}
      />
      <Tag keyValue={{ key: 'key', value: 'value value value value value value value' }} {...tagArgs} />
      <Tag keyValue={{ key: 'key key key key key key key key key key', value: 'value' }} {...tagArgs} />
      <Tag
        keyValue={{
          key: 'key key key key key key key key key key',
          value: 'value value value value value value value',
        }}
        onClose={() => {}}
        {...tagArgs}
      />
    </Stack>
  )
}

KeyValue.args = {
  keyValue: { key: 'myKey', value: 'myValue' },
  disabled: false,
  sentiment: 'neutral',
}
KeyValue.parameters = {
  docs: {
    description: {
      story:
        'Use the `keyValue` prop to make the tag display a custom, read-only key-value pair. When `keyValue` is defined, the tag does not accept children and, while it can be copiable, cannot have a copy button .',
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
