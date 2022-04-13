import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'
import { Color } from '../../theme'
import Icon from '../Icon'
import Image from '../Image'
import avatar from './avatar.svg'

const formatTextToAvatar = (text: string): string => {
  if (text.length <= 2) {
    return text.toUpperCase()
  }

  if (text.split(' ').length > 1) {
    const [a, b] = text.split(' ')

    return `${a[0]}${b[0]}`.toUpperCase()
  }

  return text.substring(0, 2).toUpperCase()
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
  border-radius: 50%;
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

const StyledImg = styled(Image)`
  height: 100%;
  width: 100%;
`

interface AvatarProps {
  image?: string
  size?: number
  text?: string
  textBgColor?: string
  textColor?: string
  textSize?: number
  lock?: boolean
}

const AvatarContainer = styled.div<{ size: number }>`
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
`

const Avatar = ({
  image = avatar,
  size = 32,
  text,
  textBgColor = 'secondary',
  textColor = 'neutral',
  textSize = 10,
  lock = false,
}: AvatarProps) => {
  const theme = useTheme()

  return (
    <AvatarContainer size={size}>
      {text ? (
        <StyledTextAvatar
          lock={lock}
          textBgColor={textBgColor}
          textColor={textColor}
          textSize={textSize}
        >
          {lock ? (
            <Icon
              name="lock"
              color={theme.colors.neutral.textWeak}
              title="Locked"
            />
          ) : (
            formatTextToAvatar(text)
          )}
        </StyledTextAvatar>
      ) : (
        <StyledImg src={image} alt="" />
      )}
    </AvatarContainer>
  )
}

Avatar.propTypes = {
  image: PropTypes.string,
  /**
   * Used only when `text` prop is specified
   */
  lock: PropTypes.bool,
  /**
   * Size of the component
   */
  size: PropTypes.number,
  text: PropTypes.string,
  /**
   * Background color when `text` prop is specified
   */
  textBgColor: PropTypes.string,
  /**
   * Text color when `text` prop is specified
   */
  textColor: PropTypes.string,
  /**
   * Text size when `text` prop is specified or size of the lock when `lock` is true
   */
  textSize: PropTypes.number,
}

export default Avatar
