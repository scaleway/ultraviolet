import { css } from '@emotion/react'
import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import { Box } from '../Box'
import { ProgressBar } from '../ProgressBar'
import { Typography } from '../Typography'

const State = ({ label, children, ...props }) => (
  <Typography
    as="div"
    variant="bodyA"
    fontWeight={500}
    color="darkBlack"
    display="flex"
    {...props}
  >
    <strong>{`${label}${children ? ': ' : ''}`}</strong>
    {children && (
      <Typography as="span" variant="bodyA" ml={1}>
        {children}
      </Typography>
    )}
  </Typography>
)

State.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node,
}

State.defaultProps = {
  children: null,
  label: '',
}

const line = css`
  flex: 1;
  margin-top: 12px;
`

const Bar = ({ unlimited, value, ...props }) => {
  const variant = useMemo(() => {
    if (unlimited) return 'success'
    if (value >= 90) return 'warning'

    return 'primary'
  }, [unlimited, value])

  return (
    <ProgressBar
      css={line}
      variant={variant}
      value={unlimited ? 100 : value}
      {...props}
    />
  )
}

Bar.propTypes = {
  unlimited: PropTypes.bool,
  value: PropTypes.number,
}

Bar.defaultProps = {
  unlimited: false,
  value: 0,
}

const StateBar = Box
StateBar.Bar = Bar
StateBar.State = State

export { StateBar }
