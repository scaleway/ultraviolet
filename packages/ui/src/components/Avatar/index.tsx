'use client'

import styled from '@emotion/styled'
import { LockIcon } from '@ultraviolet/icons'
import type { Color } from '../../theme'
import type { XOR } from '../../types'

const formatTextToAvatar = (text?: string): string => {
  if (!text) return ''

  const textCleaned = text.replace(/\s+/g, ' ').trim()

  if (textCleaned.length <= 2) {
    return textCleaned.toUpperCase()
  }

  if (textCleaned.split(' ').length > 1) {
    const [a, b] = textCleaned.split(' ')

    return `${a?.[0]}${b?.[0]}`.toUpperCase()
  }

  return textCleaned.substring(0, 2).toUpperCase()
}

type TextAvatarProps = {
  lock?: boolean
  textBgColor?: string
  textColor: string
  textSize: number
}

const StyledTextAvatar = styled.span<TextAvatarProps>`
  align-items: center;
  background-color: ${({ lock, theme, textBgColor }) =>
    lock
      ? theme.colors.neutral.backgroundStrong
      : theme.colors[textBgColor as Color]?.backgroundStrong || textBgColor};
  border-radius: ${({ theme }) => theme.radii.circle};
  color: ${({ theme, textColor }) =>
    theme.colors[textColor as 'neutral']?.textStronger ||
    theme.colors[textColor as Color]?.textStrong ||
    textColor};
  font-size: ${({ textSize }) => textSize}px;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
`

type AvatarProps = {
  /**
   * Size of the component
   */
  size?: number
  /**
   * Background color when `text` prop is specified
   */
  textBgColor?: string
  /**
   * Text color when `text` prop is specified
   */
  textColor?: string
  /**
   * Text size when `text` prop is specified or size of the lock when `lock` is true
   */
  textSize?: number
  /**
   * Used only when `text` prop is specified
   */
  lock?: boolean

  className?: string
  'data-testid'?: string
} & XOR<
  [
    {
      /**
       * **`image` or `text` property is required**
       */
      image: string
    },
    {
      /**
       * **`image` or `text` property is required**
       */
      text: string
    },
  ]
>

const AvatarContainer = styled.div<{ size: number }>`
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
`

/**
 * @deprecated This component is deprecated, please use `AvatarV2`.
 *
 * Avatar component is used to display a user's profile picture or initials.
 */
export const Avatar = ({
  image,
  size = 32,
  text,
  textBgColor = 'secondary',
  textColor = 'neutral',
  textSize = 10,
  lock = false,
  className,
  'data-testid': dataTestId,
}: AvatarProps) => (
  <AvatarContainer size={size} className={className} data-testid={dataTestId}>
    {text || (!text && !image) ? (
      <StyledTextAvatar
        lock={lock}
        textBgColor={textBgColor}
        textColor={textColor}
        textSize={textSize}
      >
        {lock ? (
          <LockIcon sentiment="neutral" prominence="weak" />
        ) : (
          formatTextToAvatar(text)
        )}
      </StyledTextAvatar>
    ) : (
      <img width="100%" height="100%" src={image ?? ''} alt="" />
    )}
  </AvatarContainer>
)
