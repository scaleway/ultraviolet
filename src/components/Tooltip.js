import React from 'react'
import ReactTooltip from 'react-tooltip'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { uniqueID } from 'helpers/uniqueID'
import { Box } from './Box'

const styles = {
  tooltip: css`
    white-space: pre-wrap;
    overflow-wrap: break-word;
    line-height: 16px;
    padding: 8px;
    text-align: center;
  `,
}

export const Tooltip = ({
  children,
  effect = 'solid',
  maxWidth = 400,
  place = 'top',
  textAlign = 'center',
  tooltip,
  tooltipWrapperClass,
  type = 'dark',
  ...props
}) => {
  const id = uniqueID()

  const tooltipProps = {
    'data-tip': true,
    'data-for': id,
  }

  return (
    <>
      {typeof children === 'function' ? (
        children(tooltipProps)
      ) : (
        <Box
          as="span"
          width="fit-content"
          {...(tooltip && {
            css: tooltipWrapperClass,
            ...tooltipProps,
          })}
          {...props}
        >
          {children}
        </Box>
      )}
      {tooltip && (
        <Box
          css={styles.tooltip}
          as={ReactTooltip}
          id={id}
          maxWidth={maxWidth}
          effect={effect}
          type={type}
          place={place}
          textAlign={textAlign}
        >
          {tooltip}
        </Box>
      )}
    </>
  )
}

Tooltip.propTypes = {
  place: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  tooltip: PropTypes.string,
  type: PropTypes.oneOf(['dark', 'success', 'warning', 'error', 'info', 'light']),
}

export default Tooltip
