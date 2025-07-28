import type { Meta } from '@storybook/react-vite'
import {
  Conversation,
  Date,
  Message,
  MessageInfos,
  MessageTag as Tag,
} from '..'

export default {
  component: Conversation,
  subcomponents: {
    'Conversation.Date': Date,
    'Conversation.Message': Message,
    'Conversation.Tag': Tag,
    'Conversation.MessageInfos': MessageInfos,
  },
  title: 'Plus/Compositions/Conversation',
} as Meta<typeof Conversation>

export { Date } from './Date.stories'
export { Message } from './Message.stories'
export { MessageInfos } from './MessageInfos.stories'
export { Playground } from './Playground.stories'
export { Tag } from './Tag.stories'
