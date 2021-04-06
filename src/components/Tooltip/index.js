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
import { Box } from '../Box'

const variants = {
  white: ({ theme }) => css`
    background-color: ${theme.colors.white};
    color: ${theme.colors.black};
    fill: ${theme.colors.white};
    box-shadow: 0 2px 5px 5px ${transparentize(0.7, theme.colors.shadow)};
  `,
  black: ({ theme }) => css`
    background-color: ${theme.colors.black};
    color: ${theme.colors.white};
    fill: ${theme.colors.black};
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
  text = '',
  placement,
  visible,
  variant,
  baseId,
  ...props
}) => {
  const tooltip = useTooltipState({ animated, placement, visible, baseId })
  const { setVisible } = tooltip
  useEffect(() => setVisible(visible), [setVisible, visible])

  if (!children) return null
  if (Array.isArray(children)) {
    // eslint-disable-next-line no-console
    console.error(
      "ScalewayUI - Tooltip: children of Tooltip component can't be an array.",
    )

    return children
  }
  // If children is a function, we return it with the Tooltip system
  // event is it's has no text because it can have a complex logic
  // and need to have the Tooltip system at anytime
  if (!text && typeof children !== 'function') {
    return children
  }

  const finalChildren = referenceProps => {
    if (typeof children === 'function') {
      return children(referenceProps)
    }
    if (typeof children === 'string') {
      return <div {...referenceProps}>{children}</div>
    }
    const childProps = (children || {}).props || {}

    if (childProps.disabled) {
      return <div {...referenceProps}>{children}</div>
    }

    return React.cloneElement(children, {
      ...referenceProps,
      ...childProps,
    })
  }

  return (
    <Box>
      <TooltipReference {...tooltip} ref={children.ref}>
        {finalChildren}
      </TooltipReference>
      <ReakitTooltip {...tooltip}>
        <StyledTooltip variant={variant} {...props}>
          <TooltipArrow {...tooltip} />
          {text}
        </StyledTooltip>
      </ReakitTooltip>
    </Box>
  )
}

Tooltip.propTypes = {
  animated: PropTypes.number,
  placement: PropTypes.string,
  variant: PropTypes.string,
  visible: PropTypes.bool,
  text: PropTypes.node,
  baseId: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func,
  ]),
}

Tooltip.defaultProps = {
  animated: 150,
  placement: 'top',
  variant: 'black',
  visible: false,
  text: '',
  baseId: undefined,
  children: null,
}

export default Tooltip
