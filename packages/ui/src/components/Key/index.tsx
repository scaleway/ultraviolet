'use client'

import type { CSSProperties } from 'react'
import { useMemo } from 'react'
import { Text } from '../Text'
import { key as keyStyle } from './styles.css'

export const KEYS_MATCH = {
  backspace: '⌫',
  command: '⌘',
  control: '⌃',
  enter: '↵',
  option: '⌥',
  shift: '⇧',
} as const

type KeyProps = {
  children: string
  prominence?: 'strong' | 'default'
  disabled?: boolean
  size?: 'small' | 'medium'
  sentiment?: 'neutral' | 'primary'
  id?: string
  className?: string
  'data-testid'?: string
  style?: CSSProperties
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
  style,
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
    <kbd
      className={`${className ? `${className} ` : ''}${keyStyle({ disabled, prominence, sentiment, size })}`}
      data-disabled={disabled}
      data-prominence={prominence}
      data-sentiment={sentiment}
      data-size={size}
      data-testid={dataTestId}
      id={id}
      style={style}
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
    </kbd>
  )
}
