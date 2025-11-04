'use client'

import { Stack, Tag, Text } from '@ultraviolet/ui'
import type { CSSProperties, ReactNode } from 'react'
import {
  conversationAvatar,
  conversationBubble,
  conversationContainer,
  conversationInfos,
  conversationRawMessage,
  conversationTag,
  styledText,
} from './styles.css'

const Conversation = ({
  children,
  style,
}: {
  children: ReactNode
  style?: CSSProperties
}) => <Stack style={style}>{children}</Stack>

export const MessageInfos = ({
  children,
  align,
  style,
}: {
  children: ReactNode
  align: 'left' | 'right'
  style?: CSSProperties
}) => (
  <div className={conversationInfos[align]} style={style}>
    {children}
  </div>
)

export const Date = ({
  children,
  style,
}: {
  children: ReactNode
  style?: CSSProperties
}) => (
  <Text
    as="p"
    className={styledText}
    prominence="weak"
    style={style}
    variant="bodySmall"
  >
    {children}
  </Text>
)

type MessageProps = {
  className?: string
  children: ReactNode
  avatar: ReactNode
  align?: 'left' | 'right'
  style?: CSSProperties
}

export const Message = ({
  className,
  children,
  avatar,
  align = 'right',
  style,
}: MessageProps) => (
  <div
    className={`${className ? `${className} ` : ''}${conversationContainer[align]}`}
    style={style}
  >
    <div className={conversationBubble}>
      <div className={conversationRawMessage[align]}>{children}</div>
    </div>
    <div className={conversationAvatar}>{avatar}</div>
  </div>
)

export const MessageTag = ({
  children,
  style,
}: {
  children: ReactNode
  style?: CSSProperties
}) => (
  <Tag className={conversationTag} style={style}>
    {children}
  </Tag>
)

Conversation.Date = Date
Conversation.Message = Message
Conversation.MessageInfos = MessageInfos
Conversation.Tag = MessageTag

export { Conversation }
