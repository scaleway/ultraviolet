'use client'

import styled from '@emotion/styled'
import { useMemo } from 'react'
import { Text } from '../Text'

const Container = styled.div`
  cursor: text;
  background: ${({ theme }) => theme.colors.neutral.backgroundWeak};
  border-radius: ${({ theme }) => theme.radii.default};
  border: 0.5px solid ${({ theme }) => theme.colors.neutral.border};
  min-width: ${({ theme }) => theme.sizing['300']};
  min-height: ${({ theme }) => theme.sizing['300']};
  display: flex;
  justify-content: center;
  align-items: center;

  &[data-disabled='true'] {
    background: ${({ theme }) => theme.colors.neutral.backgroundDisabled};
    border-color: ${({ theme }) => theme.colors.neutral.borderDisabled};
  }

  &[data-children-length='true'] {
    width: auto;
    padding: 0 ${({ theme }) => theme.space[1]}; // This part is to leave some space between the text and the border when text is long
  }
`

export const KEYS_MATCH = {
  ' ': '␣',
  Alt: 'Alt',
  ArrowDown: '↓',
  ArrowLeft: '←',
  ArrowRight: '→',
  ArrowUp: '↑',
  Backspace: '⌫',
  CapsLock: 'Caps',
  Control: 'Ctrl',
  Delete: '⌦',
  Enter: '↵',
  Escape: 'Esc',
  Meta: '⌘',
} as const

type KeyProps = {
  children: KeyboardEvent['key']
  disabled?: boolean
}

export const Key = ({ children, disabled }: KeyProps) => {
  const isSpecialKey = useMemo(
    () => Object.keys(KEYS_MATCH).find(key => key === children),
    [children],
  )

  return (
    <Container
      data-children-length={children.length > 1}
      data-disabled={disabled}
      data-testid={`key-${children}`}
    >
      <Text as="span" disabled={disabled} sentiment="neutral" variant="caption">
        {isSpecialKey
          ? KEYS_MATCH[children as keyof typeof KEYS_MATCH]
          : children}
      </Text>
    </Container>
  )
}
