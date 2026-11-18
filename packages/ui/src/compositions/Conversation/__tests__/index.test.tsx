import { describe, it } from 'vitest'
import { Conversation } from '..'
import { shouldMatchSnapshot } from '../../../__tests__/helpers'

describe('conversation', () => {
  it('should work with Default', () =>
    shouldMatchSnapshot(
      <Conversation>
        <Conversation.Date>2022-03-02</Conversation.Date>
        <Conversation.Message align="left" avatar={<div>Hello</div>}>
          <Conversation.MessageInfos align="left">Hello</Conversation.MessageInfos>
          <Conversation.Tag>Hello</Conversation.Tag>
        </Conversation.Message>
        <Conversation.Message avatar={<div>Hello</div>}>
          <Conversation.MessageInfos align="right">Hello</Conversation.MessageInfos>
          <Conversation.Tag>Hello</Conversation.Tag>
        </Conversation.Message>
      </Conversation>,
    ))
})
