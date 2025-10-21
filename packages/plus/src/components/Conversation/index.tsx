'use client'

import { Stack, Tag, Text } from '@ultraviolet/ui'
import type { ReactNode } from 'react'
import {
  conversationAvatar,
  conversationBubble,
  conversationContainer,
  conversationInfos,
  conversationRawMessage,
  conversationTag,
  styledText,
} from './styles.css'

const Conversation = ({ children }: { children: ReactNode }) => (
  <Stack>{children}</Stack>
)

export const MessageInfos = ({
  children,
  align,
}: {
  children: ReactNode
  align: 'left' | 'right'
}) => <div className={conversationInfos[align]}>{children}</div>

export const Date = ({ children }: { children: ReactNode }) => (
  <Text as="p" className={styledText} prominence="weak" variant="bodySmall">
    {children}
  </Text>
)

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
  <div
    className={`${className ? `${className} ` : ''}${conversationContainer[align]}`}
  >
    <div className={conversationBubble}>
      <div className={conversationRawMessage[align]}>{children}</div>
    </div>
    <div className={conversationAvatar}>{avatar}</div>
  </div>
)

export const MessageTag = ({ children }: { children: ReactNode }) => (
  <Tag className={conversationTag}>{children}</Tag>
)

Conversation.Date = Date
Conversation.Message = Message
Conversation.MessageInfos = MessageInfos
Conversation.Tag = MessageTag

export { Conversation }
