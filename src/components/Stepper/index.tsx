import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { Children, Fragment, ReactNode } from 'react'
import flattenChildren from 'react-flatten-children'
import Icon from '../Icon'
import Typography from '../Typography'

type Temporal = 'previous' | 'next' | 'current'

const loadingAnimation = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`

const StyledStepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`
const StyledStep = styled('div', {
  shouldForwardProp: prop => !['temporal'].includes(prop.toString()),
})<{ temporal: Temporal }>`
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ temporal, theme }) => {
    if (temporal === 'previous') return theme.colors.success.text
    if (temporal === 'current') return theme.colors.primary.text

    return theme.colors.neutral.text
  }};
  background-color: ${({ temporal, theme }) => {
    if (temporal === 'previous') return theme.colors.success.background
    if (temporal === 'current') return theme.colors.primary.background

    return 'transparent'
  }};

  border: ${({ temporal, theme }) =>
    temporal === 'next'
      ? `1px solid ${theme.colors.neutral.borderWeak}`
      : null};
`

const StyledText = styled.div`
  margin-top: ${({ theme }) => theme.space['2']};
  font-size: ${({ theme }) => theme.space['2']};
  display: flex;
  text-align: center;
`

const StyledIcon = styled(Icon)`
  fill: ${({ theme }) => theme.colors.success.text};
`

const loadingStyle = css`
  animation: ${loadingAnimation} 1s linear infinite;
`

const StyledLine = styled.div<{ temporal: Temporal; animated: boolean }>`
  border-radius: ${({ theme }) => theme.space['0.25']};
  flex-grow: 1;
  border-radius: ${({ theme }) => theme.space['0.25']};
  background-color: ${({ theme }) => theme.colors.neutral.borderWeak};
  position: relative;

  ::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    border-radius: ${({ theme }) => theme.space['0.25']};
    background-color: ${({ theme }) => theme.colors.success.backgroundStrong};
    ${({ temporal }) => temporal === 'previous' && `width: 100%;`}
    ${({ temporal, animated }) =>
      temporal === 'current' && animated && loadingStyle}
  }
`

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: 0 ${({ theme }) => theme.space['1']};

  ${StyledStep} {
    height: ${({ theme }) => theme.space['4']};
    width: ${({ theme }) => theme.space['4']};
    font-size: ${({ theme }) => theme.space['2']};
    line-height: 1;
  }

  ${StyledStepContainer} {
    width: ${({ theme }) => theme.space['4']};
    white-space: nowrap;
  }

  ${StyledLine} {
    height: ${({ theme }) => theme.space['0.5']};
    margin-top: ${({ theme }) => theme.space['2']};
    margin-bottom: ${({ theme }) => theme.space['2']};
  }

  ${StyledText} {
    margin-top: ${({ theme }) => theme.space['2']};
    font-size: ${({ theme }) => theme.space['2']};
  }
`

type StepperNumbersProps = {
  temporal: Temporal
  children: ReactNode
  CurrentStep: number
}

const StepperNumbers = ({
  temporal,
  children,
  CurrentStep,
}: StepperNumbersProps) => (
  <StyledStepContainer>
    <StyledStep temporal={temporal}>
      {temporal !== 'previous' ? (
        <Typography>{CurrentStep}</Typography>
      ) : (
        <StyledIcon name="check" size={20} />
      )}
    </StyledStep>

    <StyledText>{children}</StyledText>
  </StyledStepContainer>
)

type StepperProps = {
  animated?: boolean
  selected?: number
  children: ReactNode[]
}

const Stepper = ({ children, selected = 0, animated = true }: StepperProps) => {
  const lastStep = Children.count(children) - 1

  return (
    <StyledContainer>
      {flattenChildren(children).map((child, index) => {
        const getTemporal = () => {
          if (selected > index) return 'previous'

          if (selected === index) return 'current'

          return 'next'
        }
        const isNotLast = index < lastStep
        const temporal = getTemporal()

        return (
          // eslint-disable-next-line react/no-array-index-key
          <Fragment key={`creation-progress-${index}`}>
            <StepperNumbers CurrentStep={index + 1} temporal={temporal}>
              {child}
            </StepperNumbers>
            {isNotLast ? (
              <StyledLine temporal={temporal} animated={animated} />
            ) : null}
          </Fragment>
        )
      })}
    </StyledContainer>
  )
}

Stepper.propTypes = {
  animated: PropTypes.bool,
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  selected: PropTypes.number,
}

export default Stepper
