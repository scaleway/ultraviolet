import { Conversation } from '..'
import { Avatar } from '../../../Avatar'
import { Template } from './Template.stories'

export const Playground = Template.bind({})

Playground.args = {
  children: [
    <div key="conversation">
      <Conversation.Date>2022-03-02</Conversation.Date>
      <Conversation.Message
        align="right"
        avatar={<Avatar shape="circle" text="MC" variant="text" />}
      >
        I finally tried that new café downtown. Their coffee is amazing!
      </Conversation.Message>
      <Conversation.MessageInfos align="right">
        <Conversation.Tag>3 minutes ago</Conversation.Tag>
        sent
      </Conversation.MessageInfos>
      <Conversation.Message
        align="left"
        avatar={<Avatar shape="circle" text="TM" variant="text" />}
      >
        Oh really? I&#39;ve heard good things. Did you get one of those fancy
        lattes with the art on top?
      </Conversation.Message>
      <Conversation.MessageInfos align="left">
        <Conversation.Tag>2 minutes ago</Conversation.Tag>
        read
      </Conversation.MessageInfos>
      <Conversation.Message
        avatar={<Avatar shape="circle" text="TM" variant="text" />}
      >
        Yeah, they made a leaf pattern. I almost didn’t want to drink it, but I
        couldn’t resist!
      </Conversation.Message>
      <Conversation.MessageInfos align="right">
        <Conversation.Tag>few seconds ago</Conversation.Tag>
        sent
      </Conversation.MessageInfos>
    </div>,
  ],
}
