import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { borderRadius, black, white } from 'theming'

import {
  useTooltipState,
  Tooltip as ReakitTooltip,
  TooltipArrow,
  TooltipReference,
} from 'reakit/Tooltip'

import { Box } from './Box'

const styles = p => css`
  border-radius: ${borderRadius(p)};
  background-color: ${black(p)};
  color: ${white(p)};
  opacity: 0.8;
  font-size: 0.8rem;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  line-height: 16px;
  padding: 8px;
  text-align: center;
`

export const Tooltip = ({ children, placement = 'top', text, ...props }) => {
  const tooltip = useTooltipState({ placement })

  return (
    <>
      <TooltipReference {...tooltip} as={Box} {...props}>
        {children}
      </TooltipReference>
      {text && (
        <ReakitTooltip {...tooltip} css={styles}>
          <TooltipArrow {...tooltip} />
          {text}
        </ReakitTooltip>
      )}
    </>
  )
}

Tooltip.propTypes = {
  placement: PropTypes.string,
  tooltip: PropTypes.string,
}
