import { css } from '@emotion/core'
import { Box } from '@smooth-ui/core-em'
import PropTypes from 'prop-types'
import React from 'react'
import { ProgressBar } from '../ProgressBar'
import { Typography } from '../Typography'

const line = css`
  flex: 1;
  margin-top: 12px;
`

export function StateBar(props) {
  return <Box {...props} />
}

StateBar.State = function State({ label, children, ...props }) {
  return (
    <Typography as="div" variant="bodyA" color="gray950" {...props}>
      <strong>{`${label}${children ? ': ' : ''}`}</strong>
      {children}
    </Typography>
  )
}

StateBar.State.propTypes = {
  label: PropTypes.string,
}

StateBar.Bar = function Bar({ unlimited, value, ...props }) {
  return (
    <ProgressBar
      css={line}
      variant={unlimited ? 'success' : value >= 90 ? 'warning' : 'primary'}
      value={unlimited ? 100 : value}
      {...props}
    />
  )
}

StateBar.Bar.propTypes = {
  unlimited: PropTypes.bool,
  value: PropTypes.number,
}
