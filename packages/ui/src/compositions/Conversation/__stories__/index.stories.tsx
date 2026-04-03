import { Conversation } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: Conversation,
  subcomponents: {
    'Conversation.Date': Conversation.Date,
    'Conversation.Message': Conversation.Message,
    'Conversation.Tag': Conversation.Tag,
    'Conversation.MessageInfos': Conversation.MessageInfos,
  },
  title: 'Compositions/Conversation',
} satisfies Meta<typeof Conversation>

export { Playground } from './Playground.stories'
export { DateStory as Date } from './Date.stories'
export { Message } from './Message.stories'
export { Tag } from './Tag.stories'
export { MessageInfos } from './MessageInfos.stories'
