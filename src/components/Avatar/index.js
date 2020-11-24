import { css } from '@emotion/react'
import PropTypes from 'prop-types'
import React from 'react'
import { theme } from '../../theme'
import { Box } from '../Box'
import { Icon } from '../Icon'
import avatar from './avatar.svg'

const formatTextToAvatar = text => {
  if (text.length <= 2) {
    return text.toUpperCase()
  }

  if (text.split(' ').length > 1) {
    const [a, b] = text.split(' ')
    return `${a[0]}${b[0]}`.toUpperCase()
  }

  return text.substring(0, 2).toUpperCase()
}

const styles = {
  textAvatar: ({ textBgColor, textColor, textSize }) => css`
    align-items: center;
    background-color: ${textBgColor};
    border-radius: 50%;
    color: ${textColor};
    font-size: ${textSize}px;
    display: flex;
    height: 100%;
    justify-content: center;
    width: 100%;
  `,
  imgAvatar: css`
    height: 100%;
    width: 100%;
  `,
}

const Avatar = ({
  image,
  size,
  text,
  textBgColor,
  textColor,
  textSize,
  lock,
  ...props
}) => (
  <Box width={size} height={size} position="relative" {...props}>
    {text ? (
      <div
        css={styles.textAvatar({
          textBgColor: lock ? theme.gray50 : textBgColor,
          textColor,
          textSize,
        })}
      >
        {lock ? (
          <Icon name="lock" color="darkGrey" />
        ) : (
          formatTextToAvatar(text)
        )}
      </div>
    ) : (
      <img css={styles.imgAvatar} src={image} alt="" />
    )}
  </Box>
)

Avatar.defaultProps = {
  image: avatar,
  size: 32,
  text: null,
  textBgColor: theme.lightViolet,
  textColor: theme.white,
  textSize: 10,
  lock: false,
}

Avatar.propTypes = {
  image: PropTypes.string,
  size: PropTypes.number,
  text: PropTypes.string,
  textBgColor: PropTypes.string,
  textColor: PropTypes.string,
  textSize: PropTypes.number,
  lock: PropTypes.bool,
}

export { Avatar }
