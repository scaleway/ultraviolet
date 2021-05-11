import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'
import Box from '../Box'
import Icon from '../Icon'
import Typography from '../Typography'

const StyledBox = styled(Box, {
  shouldForwardProp: prop => !['backgroundColor'].includes(prop),
})`
  background-color: ${({ theme, backgroundColor }) =>
    theme.colors[backgroundColor] ?? backgroundColor};
  border-radius: 4px;
`

const Information = ({
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
  <StyledBox
    backgroundColor={backgroundColor}
    display="flex"
    py={2}
    px={3}
    alignItems="center"
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
  </StyledBox>
)

Information.defaultProps = {
  backgroundColor: 'white',
  children: null,
  color: 'primary',
  heading: undefined,
  icon: undefined,
  iconColor: undefined,
  iconSize: 32,
  img: undefined,
  imgSize: 57,
}

Information.propTypes = {
  backgroundColor: PropTypes.string,
  children: PropTypes.node,
  color: PropTypes.string,
  heading: PropTypes.string,
  icon: PropTypes.string,
  iconColor: PropTypes.string,
  iconSize: PropTypes.number,
  img: PropTypes.string,
  imgSize: PropTypes.number,
}

export default Information
