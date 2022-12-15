import styled from '@emotion/styled'
import type { ReactNode } from 'react'
import { useMemo } from 'react'
import ProgressBar from '../ProgressBar'
import Stack from '../Stack'
import Text from '../Text'

type StateBarStateProps = {
  children?: ReactNode
  label?: string
}

const StyledText = styled(Text)`
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.space['1']};
`

export const StateBarState = ({
  label = '',
  children,
}: StateBarStateProps): JSX.Element => (
  <StyledText variant="bodyStrong" prominence="strong" as="div" color="neutral">
    <strong>{`${label}${children ? ': ' : ''}`}</strong>
    {children && (
      <Text as="span" variant="body" color="neutral">
        {children}
      </Text>
    )}
  </StyledText>
)

type StateBarBarProps = {
  unlimited?: boolean
  value?: number
  progress?: boolean
}

const StyledProgressBar = styled(ProgressBar)`
  width: 100%;
`

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
    <StyledProgressBar
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

const StateBar: StateBarType = ({ children, className }) => (
  <Stack gap={1} className={className}>
    {children}
  </Stack>
)

StateBar.Bar = StateBarBar
StateBar.State = StateBarState

export default StateBar
