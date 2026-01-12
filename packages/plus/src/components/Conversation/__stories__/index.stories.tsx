import type { Meta } from '@storybook/react-vite'
import {
  Conversation,
  DateComponent,
  Message,
  MessageInfos,
  MessageTag as Tag,
} from '..'

export default {
  component: Conversation,
  subcomponents: {
    'Conversation.Date': DateComponent,
    'Conversation.Message': Message,
    'Conversation.Tag': Tag,
    'Conversation.MessageInfos': MessageInfos,
  },
  title: 'Plus/Compositions/Conversation',
} as Meta<typeof Conversation>

export { Playground } from './Playground.stories'
export { Date } from './Date.stories'
export { Message } from './Message.stories'
export { Tag } from './Tag.stories'
export { MessageInfos } from './MessageInfos.stories'
