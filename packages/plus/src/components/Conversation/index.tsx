import type { SerializedStyles } from '@emotion/react'
import styled from '@emotion/styled'
import { Stack, Tag, Text } from '@ultraviolet/ui'
import type { ReactNode } from 'react'

const Conversation = ({ children }: { children: ReactNode }) => (
  <Stack>{children}</Stack>
)

const MessageInfos = styled.div<{ align: 'left' | 'right' }>`
  display: flex;
  align-items: center;
  justify-content: ${({ align }) =>
    align === 'left' ? 'flex-start' : 'flex-end'};
  margin: 0 ${({ theme }) => theme.space['7']};
`

const StyledText = styled(Text)`
  margin-top: ${({ theme }) => theme.space['3']};
  text-align: center;
`

const Date = ({ children }: { children: ReactNode }) => (
  <StyledText as="p" variant="bodySmall" prominence="weak">
    {children}
  </StyledText>
)

const MessageContainer = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => theme.space['2']};
`

const RawMessageContainer = styled.div`
  margin: 0 ${({ theme }) => theme.space['3']};
  margin-top: ${({ theme }) => theme.space['3']};
  border-radius: ${({ theme }) => theme.radii.default};
  padding: ${({ theme }) => theme.space['3']};
`

const AvatarContainer = styled.div`
  display: flex;
  align-self: flex-end;
`

const BubbleContainer = styled.div`
  width: 100%;
`

type MessageProps = {
  bubbleStyle?: string | SerializedStyles
  className?: string
  children: ReactNode
  avatar: ReactNode
}

const Message = ({
  bubbleStyle,
  className,
  children,
  avatar,
}: MessageProps) => (
  <MessageContainer className={className}>
    <BubbleContainer>
      <RawMessageContainer css={bubbleStyle}>{children}</RawMessageContainer>
    </BubbleContainer>
    <AvatarContainer>{avatar}</AvatarContainer>
  </MessageContainer>
)

const StyledTag = styled(Tag)`
  background-color: ${({ theme }) => theme.colors.neutral.backgroundStrong};
  height: 16px;
  margin-right: ${({ theme }) => theme.space['1']};
`

const MessageTag = ({ children }: { children: ReactNode }) => (
  <StyledTag>{children}</StyledTag>
)

Conversation.Date = Date
Conversation.Message = Message
Conversation.MessageInfos = MessageInfos
Conversation.Tag = MessageTag

export { Conversation }
