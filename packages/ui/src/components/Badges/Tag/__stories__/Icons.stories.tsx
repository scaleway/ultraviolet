import type { StoryFn } from '@storybook/react-vite'
import { CheckIcon } from '@ultraviolet/icons/CheckIcon'
import { Tag } from '..'

export const Icons: StoryFn<typeof Tag> = args => (
  <Tag
    copiable={args.copiable}
    copiedText={args.copiedText}
    copyButton={args.copyButton}
    copyText={args.copyText}
    disabled={args.disabled}
    isLoading={args.isLoading}
    sentiment="success"
    variant={args.variant}
  >
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
