import { css } from '@emotion/react'
import PropTypes from 'prop-types'
import React from 'react'
import { colors } from '../../theme'
import { Box } from '../Box'
import Icon from '../Icon'
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
    {img && <Box as="img" mr={3} src={img} width={imgSize} height={imgSize} />}
    <Box display="flex" flexDirection={heading ? 'column' : 'row'} width="100%">
      {heading && (
        <Typography variant="bodyA" fontWeight={500} color={color}>
          {heading}
        </Typography>
      )}
      {typeof children === 'string' ? (
        <Typography variant="bodyA" color={color}>
          {children}
        </Typography>
      ) : (
        children
      )}
    </Box>
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
  children: null,
}

Information.propTypes = {
  children: PropTypes.node,
  backgroundColor: PropTypes.string,
  img: PropTypes.string,
  heading: PropTypes.string,
  color: PropTypes.string,
  icon: PropTypes.string,
  iconSize: PropTypes.number,
  iconColor: PropTypes.string,
  imgSize: PropTypes.number,
}
