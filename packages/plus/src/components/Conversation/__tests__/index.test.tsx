import { describe, it } from '@jest/globals'
import { Conversation } from '..'
import { shouldMatchEmotionSnapshot } from '../../../../.jest/helpers'

describe('Conversation', () => {
  it('should work with Default', () =>
    shouldMatchEmotionSnapshot(
      <Conversation>
        <Conversation.Date>2022-03-02</Conversation.Date>
        <Conversation.Message align="left" avatar={<div>Hello</div>}>
          <Conversation.MessageInfos align="left">
            Hello
          </Conversation.MessageInfos>
          <Conversation.Tag>Hello</Conversation.Tag>
        </Conversation.Message>
        <Conversation.Message avatar={<div>Hello</div>}>
          <Conversation.MessageInfos align="right">
            Hello
          </Conversation.MessageInfos>
          <Conversation.Tag>Hello</Conversation.Tag>
        </Conversation.Message>
      </Conversation>,
    ))
})
