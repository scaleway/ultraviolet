import { Avatar } from '@ultraviolet/ui'
import { Conversation } from '..'
import { Template } from './Template.stories'

export const Playground = Template.bind({})

Playground.args = {
  children: [
    <>
      <Conversation.Date>2022-03-02</Conversation.Date>
      <Conversation.Message
        avatar={
          <Avatar image="static/media/packages/ui/src/components/Avatar/__stories__/avatar.svg" />
        }
      >
        <Conversation.MessageInfos align="left">
          Info message 1
        </Conversation.MessageInfos>
        <Conversation.Tag>Tag message 1</Conversation.Tag>The first message!
      </Conversation.Message>
      <Conversation.Message
        avatar={
          <Avatar image="static/media/packages/ui/src/components/Avatar/__stories__/avatar.svg" />
        }
      >
        <Conversation.MessageInfos align="right">
          Info message 2
        </Conversation.MessageInfos>
        <Conversation.Tag>Tag message 2</Conversation.Tag>The second message!
      </Conversation.Message>
    </>,
  ],
}
