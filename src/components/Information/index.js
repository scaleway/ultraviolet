import { css } from '@emotion/react'
import PropTypes from 'prop-types'
import React from 'react'
import { colors } from '../../theme'
import { Box } from '../Box'
import { Icon } from '../Icon'
import { Typography } from '../Typography'

const style = ({ backgroundColor }) => css`
  background-color: ${colors[backgroundColor] ?? backgroundColor};
  border-radius: 4px;
`

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
    css={style({ backgroundColor })}
    {...props}
  >
    {icon && (
      <Icon mr={2} name={icon} size={iconSize} color={iconColor || color} />
    )}
    {img && <Box as="img" mr={3} src={img} w={imgSize} h={imgSize} />}
    <Box display="flex" flexDirection="column">
      {heading && (
        <Typography variant="bodyA" fontWeight={500} color={color}>
          {heading}
        </Typography>
      )}
      {text && (
        <Typography variant="bodyA" color={color}>
          {text}
        </Typography>
      )}
    </Box>
    {children}
  </Box>
)

Information.defaultProps = {
  backgroundColor: 'white',
  color: 'primary',
  iconSize: 32,
  imgSize: 57,
  icon: undefined,
  iconColor: undefined,
  img: undefined,
  heading: undefined,
  text: undefined,
}

Information.propTypes = {
  children: PropTypes.node.isRequired,
  text: PropTypes.string,
  backgroundColor: PropTypes.string,
  img: PropTypes.string,
  heading: PropTypes.string,
  color: PropTypes.string,
  icon: PropTypes.string,
  iconSize: PropTypes.number,
  iconColor: PropTypes.string,
  imgSize: PropTypes.number,
}
