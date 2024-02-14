import { Conversation } from '..'
import { Template } from './Template.stories'

export const Playground = Template.bind({})

Playground.args = {
  children: [
    <>
      <Conversation.Date>2022-03-02</Conversation.Date>
      <Conversation.Message avatar={<div>The first message</div>}>
        <Conversation.MessageInfos align="left">
          Info message 1{' '}
        </Conversation.MessageInfos>
        <Conversation.Tag>Tag message 1</Conversation.Tag>
      </Conversation.Message>
      <Conversation.Message
        avatar={
          <div>
            A second message. Unlimited number of messages of unlimited length.
          </div>
        }
      >
        <Conversation.MessageInfos align="right">
          Info message 2
        </Conversation.MessageInfos>
        <Conversation.Tag>Tag message 2</Conversation.Tag>
      </Conversation.Message>
    </>,
  ],
}
