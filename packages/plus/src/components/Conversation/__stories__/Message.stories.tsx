import { Conversation } from '..'
import { Template } from './Template.stories'

export const Message = Template.bind({})

Message.args = {
  children: [
    <Conversation.Message avatar={<div>Message</div>}>
      <Conversation.MessageInfos align="left">
        Message info
      </Conversation.MessageInfos>
      <Conversation.Tag>Tag</Conversation.Tag>
    </Conversation.Message>,
  ],
}

Message.parameters = {
  docs: {
    description: {
      story:
        'To display messages, you can use the prop `avatar` in the message. It is also possible to add details to the message using the subcomponents `Conversation.Tag` and `Conversation.MessageInfos`.',
    },
  },
}
