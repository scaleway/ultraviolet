import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'
import Box from '../Box'
import Icon, { icons } from '../Icon'

const StyledIcon = styled(Box, {
  shouldForwardProp: prop => !['direction'].includes(prop),
})`
  display: flex;
  flex-direction: ${({ direction }) =>
    direction === 'vertical' ? 'column' : 'row'};
  align-items: center;
`

const StyledHr = styled(Box.withComponent('hr'), {
  shouldForwardProp: prop =>
    !['direction', 'thickness', 'color', 'flex'].includes(prop),
})`
  margin: 0;
  border: 0;
  width: ${({ direction, thickness }) =>
    direction === 'vertical' ? `${thickness}px` : 'auto'};
  height: ${({ direction, thickness }) =>
    direction === 'horizontal' ? `${thickness}px` : 'auto'};
  flex-shrink: 0;
  background-color: ${({ theme, color }) => theme.colors[color] ?? color};
  ${({ flex }) => flex && `flex: ${flex};`}
`

const Separator = ({ direction, thickness, color, icon, ...props }) =>
  icon ? (
    <StyledIcon direction={direction} {...props}>
      <StyledHr
        direction={direction}
        thickness={thickness}
        color={color}
        flex="1"
      />
      <Icon name={icon} size={24} my={1} color="gray350" />
      <StyledHr
        direction={direction}
        thickness={thickness}
        color={color}
        flex="1"
      />
    </StyledIcon>
  ) : (
    <StyledHr
      direction={direction}
      thickness={thickness}
      color={color}
      {...props}
    />
  )

Separator.propTypes = {
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
  thickness: PropTypes.number,
  icon: PropTypes.oneOf(icons),
  color: PropTypes.string,
}

Separator.defaultProps = {
  direction: 'horizontal',
  thickness: 1,
  icon: null,
  color: 'gray200',
}

export default Separator
