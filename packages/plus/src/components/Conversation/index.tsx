'use client'

import styled from '@emotion/styled'
import { Stack, Tag, Text } from '@ultraviolet/ui'
import type { ReactNode } from 'react'

const Conversation = ({ children }: { children: ReactNode }) => (
  <Stack>{children}</Stack>
)
const StyledInfos = styled.div<{ align: 'left' | 'right' }>`
  display: flex;
  align-items: center;
  justify-content: ${({ align }) =>
    align === 'left' ? 'flex-start' : 'flex-end'};
  margin: 0 ${({ theme }) => theme.space['7']};
`
export const MessageInfos = ({
  children,
  align,
}: {
  children: ReactNode
  align: 'left' | 'right'
}) => <StyledInfos align={align}>{children}</StyledInfos>

const StyledText = styled(Text)`
  margin-top: ${({ theme }) => theme.space['3']};
  text-align: center;
`

export const Date = ({ children }: { children: ReactNode }) => (
  <StyledText as="p" prominence="weak" variant="bodySmall">
    {children}
  </StyledText>
)

const MessageContainer = styled('div', {
  shouldForwardProp: prop => !['align'].includes(prop),
})<{ align: 'left' | 'right' }>`
  display: flex;
  flex-direction: ${({ align }) => (align === 'left' ? 'row-reverse' : 'row')};
  margin-bottom: ${({ theme }) => theme.space['2']};
`

const RawMessageContainer = styled('div', {
  shouldForwardProp: prop => !['align'].includes(prop),
})<{ align: 'left' | 'right' }>`
  margin: 0 ${({ theme }) => theme.space['3']};
  margin-top: ${({ theme }) => theme.space['3']};
  border-radius: ${({ theme }) => theme.radii.default};
  padding: ${({ theme }) => theme.space['3']};
  background-color: ${({ theme, align }) =>
    align === 'left'
      ? theme.colors.neutral.backgroundStrong
      : theme.colors.primary.background};
`

const AvatarContainer = styled.div`
  display: flex;
  align-self: flex-end;
`

const BubbleContainer = styled.div`
  width: 100%;
`

type MessageProps = {
  className?: string
  children: ReactNode
  avatar: ReactNode
  align?: 'left' | 'right'
}

export const Message = ({
  className,
  children,
  avatar,
  align = 'right',
}: MessageProps) => (
  <MessageContainer align={align} className={className}>
    <BubbleContainer>
      <RawMessageContainer align={align}>{children}</RawMessageContainer>
    </BubbleContainer>
    <AvatarContainer>{avatar}</AvatarContainer>
  </MessageContainer>
)

const StyledTag = styled(Tag)`
  background-color: ${({ theme }) => theme.colors.neutral.backgroundStrong};
  height: 16px;
  margin-right: ${({ theme }) => theme.space['1']};
`

export const MessageTag = ({ children }: { children: ReactNode }) => (
  <StyledTag>{children}</StyledTag>
)

Conversation.Date = Date
Conversation.Message = Message
Conversation.MessageInfos = MessageInfos
Conversation.Tag = MessageTag

export { Conversation }
