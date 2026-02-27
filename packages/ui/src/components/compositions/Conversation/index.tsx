'use client'

import { cn } from '@ultraviolet/utils'
import type { CSSProperties, ReactNode } from 'react'
import { Stack } from '../../Stack'
import { Tag } from '../../Tag'
import { Text } from '../../Text'
import { conversationStyle } from './styles.css'

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
  <div className={conversationStyle.infos[align]} style={style}>
    {children}
  </div>
)

export const DateComponent = ({
  children,
  style,
}: {
  children: ReactNode
  style?: CSSProperties
}) => (
  <Text
    as="p"
    className={conversationStyle.styledText}
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
    className={cn(className, conversationStyle.container[align])}
    style={style}
  >
    <div className={conversationStyle.bubble}>
      <div className={conversationStyle.rawMessage[align]}>{children}</div>
    </div>
    <div className={conversationStyle.avatar}>{avatar}</div>
  </div>
)

export const MessageTag = ({
  children,
  style,
}: {
  children: ReactNode
  style?: CSSProperties
}) => (
  <Tag className={conversationStyle.tag} style={style}>
    {children}
  </Tag>
)

Conversation.Date = DateComponent
Conversation.Message = Message
Conversation.MessageInfos = MessageInfos
Conversation.Tag = MessageTag

export { Conversation }
