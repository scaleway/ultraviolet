import type { StoryFn } from '@storybook/react-vite'
import { CheckIcon } from '@ultraviolet/icons/CheckIcon'
import { Tag } from '..'

export const Icons: StoryFn<typeof Tag> = args => (
  <Tag {...args} sentiment="success">
    <CheckIcon size="small" />
    Valid
  </Tag>
)

Icons.parameters = {
  docs: {
    description: {
      story:
        'To add an icon simply pass it as a child of the `Tag` component. The sentiment of the icon will automatically follow the sentiment of the tag.',
    },
  },
}

Icons.args = {
  children: 'Valid',
}
