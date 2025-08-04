'use client'

import styled from '@emotion/styled'
import { useMemo } from 'react'
import { Text } from '../Text'

export const KEYS_MATCH = {
  backspace: '⌫',
  command: '⌘',
  control: '⌃',
  enter: '↵',
  option: '⌥',
  shift: '⇧',
} as const

const KeyContainer = styled.kbd`
  cursor: default;
  background: ${({ theme }) => theme.colors.neutral.backgroundWeak};
  border-radius: ${({ theme }) => theme.radii.default};
  border: 0.5px solid ${({ theme }) => theme.colors.neutral.borderWeak};
  min-width: ${({ theme }) => theme.sizing['300']};
  height: ${({ theme }) => theme.sizing['300']};
  display: flex;
  justify-content: center;
  align-items: center;

  /** Neutral style */
  &[data-prominence='strong'] {
    background-color: ${({ theme }) => theme.colors.neutral.backgroundStronger};
    border-color: ${({ theme }) => theme.colors.neutral.border};

    &[data-disabled="true"] {
      background-color: ${({ theme }) => theme.colors.neutral.backgroundStrongerDisabled};
      border-color: ${({ theme }) => theme.colors.neutral.borderDisabled};
    }
  }

  &[data-disabled='true'] {
    background-color: ${({ theme }) => theme.colors.neutral.backgroundWeakDisabled};
    border-color: ${({ theme }) => theme.colors.neutral.borderWeakDisabled};
  }

  /** Primary style */
  &[data-sentiment="primary"] {
    background-color: ${({ theme }) => theme.colors.primary.background};
    border-color: ${({ theme }) => theme.colors.primary.border};

    &[data-prominence='strong'] {
      background-color: ${({ theme }) => theme.colors.primary.backgroundStrong};

      &[data-disabled="true"] {
        background-color: ${({ theme }) => theme.colors.primary.backgroundStrongDisabled};
      }
    }

    &[data-disabled='true'] {
      background: ${({ theme }) => theme.colors.primary.backgroundDisabled};
      border-color: ${({ theme }) => theme.colors.neutral.borderDisabled};
    }
  }

  /** Size */
  &[data-size="small"] {
    min-width: ${({ theme }) => theme.sizing['250']};
    height: ${({ theme }) => theme.sizing['250']};
  }
`

type KeyProps = {
  children: string
  prominence?: 'strong' | 'default'
  disabled?: boolean
  size?: 'small' | 'medium'
  sentiment?: 'neutral' | 'primary'
  id?: string
  className?: string
  'data-testid'?: string
}

/**
 * Key is a visual component used to display keyboard shortcuts.
 */
export const Key = ({
  children,
  prominence = 'default',
  disabled,
  size = 'medium',
  sentiment = 'neutral',
  id,
  className,
  'data-testid': dataTestId,
}: KeyProps) => {
  const specialKey = useMemo(
    () => Object.keys(KEYS_MATCH).find(key => key === children.toLowerCase()),
    [children],
  )
  const textProminence = useMemo(() => {
    if (prominence === 'default') {
      return 'default'
    }

    if (sentiment === 'primary') {
      return 'strong'
    }

    return 'stronger'
  }, [sentiment, prominence])

  return (
    <KeyContainer
      className={className}
      data-disabled={disabled}
      data-prominence={prominence}
      data-sentiment={sentiment}
      data-size={size}
      data-testid={dataTestId}
      id={id}
    >
      <Text
        as="span"
        disabled={disabled}
        prominence={textProminence}
        sentiment={sentiment}
        variant={size === 'medium' ? 'caption' : 'captionSmall'}
      >
        {specialKey
          ? KEYS_MATCH[specialKey as keyof typeof KEYS_MATCH]
          : children}
      </Text>
    </KeyContainer>
  )
}
