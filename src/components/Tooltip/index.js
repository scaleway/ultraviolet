import { css } from '@emotion/core'
import { transparentize } from 'polished'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import {
  Tooltip as ReakitTooltip,
  TooltipArrow,
  TooltipReference,
  useTooltipState,
} from 'reakit/Tooltip'
import { theme } from '../../theme'
import { borderRadius } from '../../theming'
import { cx } from '../../utils'
import { Box } from '../Box'

const variants = {
  white: css`
    background-color: ${theme.white};
    color: ${theme.black};
    fill: ${theme.white};
    box-shadow: 0 2px 5px 5px ${transparentize(0.7, theme.shadow)};
  `,
  black: css`
    background-color: ${theme.black};
    color: ${theme.white};
    fill: ${theme.black};
    box-shadow: 0 2px 5px 5px ${transparentize(0.7, theme.shadow)};
  `,
}

const style = {
  tooltip: p => css`
    border-radius: ${borderRadius(p)};
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
  `,
}

export const Tooltip = ({
  animated,
  children,
  text = '',
  placement,
  visible,
  variant,
  ...props
}) => {
  const tooltip = useTooltipState({ animated, placement, visible })
  useEffect(() => tooltip.setVisible(visible), [visible])

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
      <ReakitTooltip style={{ zIndex: 9999 }} {...tooltip}>
        <Box css={cx([style.tooltip, variants[variant]])} {...props}>
          <TooltipArrow {...tooltip} />
          {text}
        </Box>
      </ReakitTooltip>
    </Box>
  )
}

Tooltip.propTypes = {
  animated: PropTypes.number,
  placement: PropTypes.string,
  text: PropTypes.node,
  variant: PropTypes.string,
  visible: PropTypes.bool,
}

Tooltip.defaultProps = {
  animated: 150,
  placement: 'top',
  text: '',
  variant: 'black',
  visible: false,
}
