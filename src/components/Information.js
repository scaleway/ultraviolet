import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { Box } from '@smooth-ui/core-em'
import { Icon } from 'components/Icon'
import { Typography } from 'components/Typography'
import { cx, thColor } from 'utils'

const style = ({ backgroundColor }) => p => {
  return css`
    background-color: ${thColor(backgroundColor)(p) || backgroundColor};
    border-radius: 4px;
  `
}

export const Information = ({
  children,
  backgroundColor,
  color,
  icon,
  iconColor,
  iconSize,
  img,
  imgSize,
  heading,
  text,
  ...props
}) => (
  <Box
    display="flex"
    py={2}
    px={3}
    alignItems="center"
    css={cx(style({ backgroundColor }))}
    {...props}
  >
    {icon && (
      <Icon mr={2} name={icon} size={iconSize} color={iconColor || color} />
    )}
    {img && <Box as="img" mr={3} src={img} width={imgSize} height={imgSize} />}
    <Box display="flex" flexDirection="column">
      {heading && (
        <Typography variant="bodyA" fontWeight={500} color={color}>
          {heading}
        </Typography>
      )}
      <Typography variant="bodyA" color={color}>
        {text}
      </Typography>
    </Box>
    {children}
  </Box>
)

Information.defaultProps = {
  backgroundColor: 'white',
  color: 'primary',
  iconSize: 32,
  imgSize: 57,
}

Information.propTypes = {
  backgroundColor: PropTypes.string,
  color: PropTypes.oneOf(['primary', 'alert']),
  icon: PropTypes.string,
  iconSize: PropTypes.number,
  iconColor: PropTypes.string,
  imgSize: PropTypes.number,
}
