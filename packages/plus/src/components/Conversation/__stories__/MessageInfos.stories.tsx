import { Conversation } from '..'
import { Template } from './Template.stories'

export const MessageInfos = Template.bind({})

MessageInfos.args = {
  children: (
    <Conversation.MessageInfos align="left">
      Message info
    </Conversation.MessageInfos>
  ),
}
