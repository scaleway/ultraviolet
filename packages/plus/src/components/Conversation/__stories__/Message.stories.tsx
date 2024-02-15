import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ProductIcon } from '@ultraviolet/icons'
import { Avatar, Text } from '@ultraviolet/ui'
import { Conversation } from '..'

const StyledMessageLeft = styled(Conversation.Message)`
  flex-direction: row-reverse;
`

const StyledMessageRight = styled(Conversation.Message)`
  flex-direction: row;
`

const StyledText = styled(Text)`
  white-space: pre-wrap;
`

export const Message = () => (
  <>
    <StyledMessageLeft
      avatar={<ProductIcon name="support" size="medium" />}
      bubbleStyle={css`
        margin-right: 20%;
        border-bottom-left-radius: 0;
        background-color: '#0078d2';
      `}
    >
      <Text variant="body" sentiment="neutral" as="div">
        Message left
      </Text>
    </StyledMessageLeft>
    <Conversation.MessageInfos align="left">
      {' '}
      <Conversation.Tag>tag</Conversation.Tag>
      <Text as="p" variant="bodySmall" prominence="weak">
        infos
      </Text>
    </Conversation.MessageInfos>

    <StyledMessageRight
      avatar={
        <Avatar
          size={40}
          image="static/media/packages/ui/src/components/Avatar/__stories__/avatar.svg"
        />
      }
      bubbleStyle={css`
        background: green;
      `}
    >
      <StyledText variant="body" sentiment="neutral" as="div" placement="right">
        message right
      </StyledText>
    </StyledMessageRight>
    <Conversation.MessageInfos align="right">
      <Conversation.Tag>tag</Conversation.Tag>
      <Text as="p" variant="bodySmall" prominence="weak">
        info
      </Text>
    </Conversation.MessageInfos>
  </>
)

Message.parameters = {
  docs: {
    description: {
      story:
        'To display an avatar, you can use the prop `avatar` in the message. It is also possible to add details to the message using the subcomponents `Conversation.Tag` and `Conversation.MessageInfos`.',
    },
  },
}
