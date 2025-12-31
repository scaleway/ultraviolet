import type { Decorator, StoryFn } from '@storybook/react-vite'
import { Stack } from '../../Stack'
import { Tag } from '..'

export const Copiable: StoryFn<typeof Tag> = args => (
  <Stack gap={1}>
    Without copyButton: <Tag {...args} />
    With copyButton: <Tag {...args} copyButton />
  </Stack>
)

Copiable.args = {
  children: 'Tag content',
  copiable: true,
  copiedText: 'Value copied!',
  copyText: 'Click to copy',
}

Copiable.parameters = {
  docs: {
    description: {
      story:
        'Use the `copiable` prop to make the tag copiable. The children should be a string. You can also customize the tooltip using the `copyText` & `copiedText` props.',
    },
  },
}

Copiable.decorators = [
  StoryComponent => (
    <div style={{ width: 'fit-content' }}>
      <StoryComponent />
    </div>
  ),
] as Decorator[]
