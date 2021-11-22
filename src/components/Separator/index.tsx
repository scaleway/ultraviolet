import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, { ReactNode } from 'react'
import { Color } from '../../theme/colors'
import Box, { XStyledProps } from '../Box'
import Icon, { IconName, icons } from '../Icon'

type Direction = 'horizontal' | 'vertical'

type StyledIconProps = {
  direction: Direction
} & XStyledProps

const StyledIcon = styled(Box, {
  shouldForwardProp: prop => !['direction'].includes(prop.toString()),
})<StyledIconProps>`
  display: flex;
  flex-direction: ${({ direction }) =>
    direction === 'vertical' ? 'column' : 'row'};
  align-items: center;
`

type HorizontalSeparatorProps = {
  direction?: Direction
  thickness?: number
  color?: Color | string
  flex?: string
} & XStyledProps

const StyledHr = styled(Box.withComponent('hr'), {
  shouldForwardProp: prop =>
    !['direction', 'thickness', 'color', 'flex'].includes(prop.toString()),
})<HorizontalSeparatorProps>`
  margin: 0;
  border: 0;
  width: ${({ direction, thickness = 1 }) =>
    direction === 'vertical' ? `${thickness}px` : 'auto'};
  height: ${({ direction, thickness = 1 }) =>
    direction === 'horizontal' ? `${thickness}px` : 'auto'};
  flex-shrink: 0;
  background-color: ${({ theme, color }) =>
    theme.colors[color as Color] ?? color};
  ${({ flex }) => flex && `flex: ${flex};`}
`

export type SeparatorProps = HorizontalSeparatorProps & {
  icon?: IconName
  children?: ReactNode
}
const Separator = ({
  direction = 'horizontal',
  thickness = 1,
  color = 'gray200',
  icon,
  ...props
}: SeparatorProps): JSX.Element =>
  icon ? (
    <StyledIcon
      role="separator"
      aria-orientation={direction}
      direction={direction}
      {...props}
    >
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
      role="separator"
      aria-orientation={direction}
      direction={direction}
      thickness={thickness}
      color={color}
      {...props}
    />
  )

Separator.propTypes = {
  color: PropTypes.string,
  direction: PropTypes.oneOf<Direction>(['horizontal', 'vertical']),
  icon: PropTypes.oneOf(icons),
  thickness: PropTypes.number,
}

export default Separator
