import { Avatar } from '@ultraviolet/ui'
import { Conversation } from '..'
import { Template } from './Template.stories'

export const Message = Template.bind({})

Message.args = {
  children: [
    <Conversation.Message
      avatar={
        <Avatar image="static/media/packages/ui/src/components/Avatar/__stories__/avatar.svg" />
      }
    >
      <Conversation.MessageInfos align="left">
        Info message 1
      </Conversation.MessageInfos>
      <Conversation.Tag>Tag message 1</Conversation.Tag>The first message!
    </Conversation.Message>,
  ],
}

Message.parameters = {
  docs: {
    description: {
      story:
        'To display an avatar, you can use the prop `avatar` in the message. It is also possible to add details to the message using the subcomponents `Conversation.Tag` and `Conversation.MessageInfos`.',
    },
  },
}
