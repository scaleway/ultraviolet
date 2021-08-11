import { css } from '@emotion/react'
import PropTypes from 'prop-types'
import React, {
  FunctionComponent,
  ReactNode,
  VoidFunctionComponent,
  useMemo,
} from 'react'
import Box from '../Box'
import ProgressBar from '../ProgressBar'
import Typography from '../Typography'

interface StateBarStateProps {
  children?: ReactNode
  label?: string
}

export const State: FunctionComponent<StateBarStateProps> = ({
  label = '',
  children,
  ...props
}) => (
  <Typography
    as="div"
    variant="bodyA"
    fontWeight={500}
    color="gray950"
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
  children: PropTypes.node,
  label: PropTypes.string,
}

const line = css`
  flex: 1;
  margin-top: 12px;
`

interface StateBarBarProps {
  unlimited?: boolean
  value?: number
}

export const Bar: VoidFunctionComponent<StateBarBarProps> = ({
  unlimited = false,
  value = 0,
  ...props
}) => {
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

type StateBarType = typeof Box & {
  Bar?: typeof Bar
  State?: typeof State
}

const StateBar: StateBarType = Box

StateBar.Bar = Bar
StateBar.State = State

export default StateBar
