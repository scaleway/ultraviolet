import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { transparentize } from 'polished'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import {
  Tooltip as ReakitTooltip,
  TooltipArrow,
  TooltipReference,
  useTooltipState,
} from 'reakit/Tooltip'
import Box from '../Box'
import FlexBox from '../FlexBox'

const variants = {
  black: ({ theme }) => css`
    background-color: ${theme.colors.black};
    color: ${theme.colors.white};
    fill: ${theme.colors.black};
    box-shadow: 0 2px 5px 5px ${transparentize(0.7, theme.colors.shadow)};
  `,
  white: ({ theme }) => css`
    background-color: ${theme.colors.white};
    color: ${theme.colors.black};
    fill: ${theme.colors.white};
    box-shadow: 0 2px 5px 5px ${transparentize(0.7, theme.colors.shadow)};
  `,
}

const variantStyles = ({ variant, ...props }) => variants[variant]?.(props)

const StyledTooltip = styled(Box, {
  shouldForwardProp: prop => !['variant'].includes(prop),
})`
  border-radius: ${({ theme }) => theme.radii.default};
  opacity: 0;
  font-size: 0.8rem;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  line-height: 16px;
  padding: 8px;
  text-align: center;

  transition: opacity 150ms ease-in-out, transform 150ms ease-in-out;
  transform-origin: top center;
  transform: translate3d(0, -4px, 0);

  [data-enter] & {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  ${variantStyles}
`

const Tooltip = ({
  animated,
  children,
  text,
  placement,
  visible,
  variant,
  baseId,
  zIndex,
  ...props
}) => {
  const tooltip = useTooltipState({ animated, baseId, placement, visible })
  const { setVisible } = tooltip
  useEffect(() => setVisible(visible), [setVisible, visible])

  if (!text) {
    return children
  }

  return (
    <FlexBox>
      <TooltipReference {...tooltip}>
        {typeof children === 'function'
          ? referenceProps => children(referenceProps)
          : children}
      </TooltipReference>
      <ReakitTooltip {...tooltip} style={{ zIndex }}>
        <StyledTooltip variant={variant} {...props}>
          <TooltipArrow {...tooltip} />
          {text}
        </StyledTooltip>
      </ReakitTooltip>
    </FlexBox>
  )
}

Tooltip.propTypes = {
  animated: PropTypes.number,
  baseId: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func,
  ]).isRequired,
  placement: PropTypes.string,
  text: PropTypes.node,
  variant: PropTypes.string,
  visible: PropTypes.bool,
  zIndex: PropTypes.number,
}

Tooltip.defaultProps = {
  animated: 150,
  baseId: undefined,
  placement: 'top',
  text: '',
  variant: 'black',
  visible: false,
  zIndex: undefined,
}

export default Tooltip
