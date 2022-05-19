import { css } from '@emotion/react'
import PropTypes from 'prop-types'
import { ReactNode, useMemo } from 'react'
import Box from '../Box'
import ProgressBar from '../ProgressBar'
import Typography from '../Typography'

interface StateBarStateProps {
  children?: ReactNode
  label?: string
}

export const StateBarState = ({
  label = '',
  children,
  ...props
}: StateBarStateProps): JSX.Element => (
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

StateBarState.propTypes = {
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
  progress?: boolean
}

export const StateBarBar = ({
  unlimited = false,
  value = 0,
  ...props
}: StateBarBarProps): JSX.Element => {
  const variant = useMemo(() => {
    if (unlimited) return 'success'
    if (value < 90 && value >= 70) return 'warning'
    if (value >= 90) return 'danger'

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

StateBarBar.propTypes = {
  unlimited: PropTypes.bool,
  value: PropTypes.number,
}

type StateBarType = typeof Box & {
  Bar: (props: StateBarBarProps) => JSX.Element
  State: (props: StateBarStateProps) => JSX.Element
}

const StateBar: StateBarType = Box as StateBarType

StateBar.Bar = StateBarBar
StateBar.State = StateBarState

export default StateBar
