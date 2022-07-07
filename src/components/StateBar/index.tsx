import { css } from '@emotion/react'
import { ReactNode, useMemo } from 'react'
import ProgressBar from '../ProgressBar'
import Typography from '../Typography'

interface StateBarStateProps {
  children?: ReactNode
  label?: string
}

export const StateBarState = ({
  label = '',
  children,
}: StateBarStateProps): JSX.Element => (
  <Typography
    as="div"
    variant="bodyA"
    fontWeight={500}
    color="gray950"
    display="flex"
  >
    <strong>{`${label}${children ? ': ' : ''}`}</strong>
    {children && (
      <Typography as="span" variant="bodyA" ml={1}>
        {children}
      </Typography>
    )}
  </Typography>
)

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
  progress = false,
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
      progress={progress}
    />
  )
}

type StateBarType = ((props: {
  children: ReactNode
  className?: string
}) => JSX.Element) & {
  Bar: (props: StateBarBarProps) => JSX.Element
  State: (props: StateBarStateProps) => JSX.Element
}

// eslint-disable-next-line react/prop-types
const StateBar: StateBarType = ({ children, className }) => (
  <div className={className}>{children}</div>
)

StateBar.Bar = StateBarBar
StateBar.State = StateBarState

export default StateBar
