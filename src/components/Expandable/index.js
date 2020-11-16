import { css } from '@emotion/core'
import PropTypes from 'prop-types'
import React from 'react'
import { cx } from '../../utils'
import { Box } from '../Box'

const styles = {
  container: css`
    transition: max-height 300ms ease-out, opacity 300ms ease-out;
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    height: auto;
    margin-top: 0;
  `,
}

export function Expandable({ opened, height = 5000, children, ...props }) {
  return (
    <Box
      css={cx([
        styles.container,
        opened &&
          css`
            transition: max-height 300ms ease-in, opacity 300ms ease-in;
            max-height: ${height}px;
            opacity: 1;
            overflow: visible;
          `,
      ])}
      {...props}
    >
      {children}
    </Box>
  )
}

Expandable.propTypes = {
  opened: PropTypes.bool,
  height: PropTypes.number,
}
