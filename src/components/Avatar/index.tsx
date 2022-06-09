import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { Color } from '../../theme'
import { XOR } from '../../utils/xor'
import Icon from '../Icon'
import Image from '../Image'

const formatTextToAvatar = (text?: string): string => {
  if (!text) return ''

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

const Avatar = ({
  image,
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
      {text || (!text && !image) ? (
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

export default Avatar
