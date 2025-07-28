import type { Decorator } from '@storybook/react-vite'
import { Template } from './Template.stories'

export const Copiable = Template.bind({})

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
