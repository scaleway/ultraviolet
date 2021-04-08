import { css } from '@emotion/react'
import PropTypes from 'prop-types'
import React from 'react'
import Box from '../Box'

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

const openedStyle = height => css`
  transition: max-height 300ms ease-in, opacity 300ms ease-in;
  max-height: ${height}px;
  opacity: 1;
  overflow: visible;
`

export function Expandable({ opened, height, children, ...props }) {
  return (
    <Box css={[styles.container, opened && openedStyle(height)]} {...props}>
      {children}
    </Box>
  )
}

Expandable.propTypes = {
  children: PropTypes.node.isRequired,
  opened: PropTypes.bool,
  height: PropTypes.number,
}

Expandable.defaultProps = {
  opened: false,
  height: 5000,
}
