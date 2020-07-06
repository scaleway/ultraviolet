import React from 'react'
import PropTypes from 'prop-types'
import {
  useTooltipState,
  Tooltip as ReakitTooltip,
  TooltipArrow,
  TooltipReference,
} from 'reakit/Tooltip'
import { css } from '@emotion/core'
import { Box } from '@smooth-ui/core-em'
import { borderRadius, black, white } from 'theming'

const style = {
  tooltip: p => css`
    border-radius: ${borderRadius(p)};
    background-color: ${black(p)};
    color: ${white(p)};
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
  children,
  text = '',
  customStyle,
  placement = 'top',
  ...props
}) => {
  const tooltip = useTooltipState({ animated: 150, placement })

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
    <Box zIndex={1}>
      <TooltipReference {...tooltip}>{finalChildren}</TooltipReference>
      <ReakitTooltip style={{ zIndex: 9999 }} {...tooltip}>
        <Box css={style.tooltip} {...props}>
          <TooltipArrow {...tooltip} />
          {text}
        </Box>
      </ReakitTooltip>
    </Box>
  )
}

Tooltip.propTypes = {
  placement: PropTypes.string,
}
