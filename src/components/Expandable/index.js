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

const Expandable = ({ opened, height, children, ...props }) => (
  <Box css={[styles.container, opened && openedStyle(height)]} {...props}>
    {children}
  </Box>
)

Expandable.propTypes = {
  /**
   * The content to display
   */
  children: PropTypes.node.isRequired,
  /**
   * The maxHeight of the content to make the opening and closing animation
   */
  height: PropTypes.number,
  /**
   * To display or not the content
   */
  opened: PropTypes.bool,
}

Expandable.defaultProps = {
  height: 5000,
  opened: false,
}

export default Expandable
