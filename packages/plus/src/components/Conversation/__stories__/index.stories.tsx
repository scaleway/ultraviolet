import type { Meta } from '@storybook/react-vite'
import { Conversation } from '..'

export default {
  component: Conversation,
  subcomponents: {
    'Conversation.Date': Conversation.Date,
    'Conversation.Message': Conversation.Message,
    'Conversation.Tag': Conversation.Tag,
    'Conversation.MessageInfos': Conversation.MessageInfos,
  },
  tags: ['deprecated'],
  title: 'Plus/Compositions/Conversation',
  parameters: {
    docs: {
      description: {
        component:
          'This component is deprecated, please import it from `@ultraviolet/ui/compositions/Conversation` instead. [Click here to see the full documentation](https://storybook.ultraviolet.scaleway.com/?path=/docs/compositions-conversation--docs).',
      },
    },
  },
} as Meta<typeof Conversation>

export { Playground } from './Playground.stories'
