import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, { FunctionComponent } from 'react'
import { Color } from '../../theme'
import Box from '../Box'
import Icon from '../Icon'
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

const StyledDiv = styled.div<{
  lock?: boolean
  textBgColor?: string
  textColor: string
  textSize: number
}>`
  align-items: center;
  background-color: ${({ lock, theme, textBgColor }) =>
    lock
      ? theme.colors.neutral.background
      : theme.colors[textBgColor as Color]?.backgroundStrong || textBgColor};
  border-radius: 50%;
  color: ${({ theme, textColor }) =>
    theme.colors[textColor as Color]?.textStrong || textColor};
  font-size: ${({ textSize }) => textSize}px;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
`

const StyledImg = styled.img`
  height: 100%;
  width: 100%;
`

interface AvatarProps {
  alt?: string
  image?: string
  size?: number
  text?: string
  textBgColor?: string
  textColor?: string
  textSize?: number
  lock?: boolean
}

const Avatar: FunctionComponent<AvatarProps> = ({
  alt = 'Avatar',
  image = avatar,
  size = 32,
  text,
  textBgColor = 'secondary',
  textColor = 'neutral',
  textSize = 10,
  lock = false,
  ...props
}) => {
  const theme = useTheme()

  return (
    <Box width={size} height={size} position="relative" {...props}>
      {text ? (
        <StyledDiv
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
        </StyledDiv>
      ) : (
        <StyledImg src={image} alt={alt} />
      )}
    </Box>
  )
}

Avatar.propTypes = {
  /**
   * Used only when `text` prop isn't specified
   */
  alt: PropTypes.string,
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
