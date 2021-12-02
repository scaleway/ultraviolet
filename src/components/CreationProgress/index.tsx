import { Theme, css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, { FunctionComponent, ReactNodeArray } from 'react'
import flattenChildren from 'react-flatten-children'
import Icon from '../Icon'
import Typography from '../Typography'

type Temporal = 'future' | 'past' | 'current'

const sizes = {
  large: {
    line: 12,
    step: 28,
    stepBorder: 2,
    stepTextMargin: 15,
    text: 14,
  },
  medium: {
    line: 10,
    step: 24,
    stepBorder: 2,
    stepTextMargin: 15,
    text: 12,
  },
  small: {
    line: 8,
    step: 20,
    stepBorder: 2,
    stepTextMargin: 15,
    text: 11,
  },
  xlarge: {
    line: 14,
    step: 32,
    stepBorder: 3,
    stepTextMargin: 15,
    text: 16,
  },
  xsmall: {
    line: 5,
    step: 16,
    stepBorder: 1,
    stepTextMargin: 15,
    text: 10,
  },
}

type Size = keyof typeof sizes

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

const temporalStepStyles = ({
  temporal,
  theme,
}: {
  temporal: Temporal
  theme: Theme
}) =>
  temporal !== 'future'
    ? css`
        background-color: ${theme.colorsDeprecated.success};
      `
    : css`
        background-color: transparent;
        border-style: solid;
        border-color: ${theme.colorsDeprecated.gray350};
      `

const StyledStep = styled('div', {
  shouldForwardProp: prop => !['temporal'].includes(prop.toString()),
})<{ temporal: Temporal }>`
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  ${temporalStepStyles}
`

const StyledText = styled.div`
  margin-top: 16px;
  font-size: 16px;
  display: flex;
  text-align: center;
`

const StyledFutureInternalDot = styled.div`
  background-color: ${({ theme: { colorsDeprecated } }) =>
    colorsDeprecated.gray350};
  height: 7px;
  width: 7px;
  border-radius: 16px;
`

const loadingStyle = css`
  animation: ${loadingAnimation} 1s linear infinite;
`

const StyledLine = styled.div<{ temporal: Temporal; animated: boolean }>`
  border-radius: 2px;
  flex-grow: 1;
  border-radius: 2px;
  background-color: ${({ theme: { colorsDeprecated } }) =>
    colorsDeprecated.gray350};
  position: relative;

  ::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    border-radius: 2px;
    background-color: ${({ theme }) => theme.colorsDeprecated.success};
    ${({ temporal }) => temporal === 'past' && `width: 100%;`}
    ${({ temporal, animated }) =>
      temporal === 'current' && animated && loadingStyle}
  }
`

const StyledContainer = styled.div<{ size: Size }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;

  ${StyledStep} {
    height: ${({ size }) => sizes[size].step}px;
    width: ${({ size }) => sizes[size].step}px;
    font-size: ${({ size }) => sizes[size].text}px;
    line-height: 1;
    border-width: ${({ size }) => sizes[size].stepBorder}px;
  }

  ${StyledStepContainer} {
    margin: 0 8px;
    width: ${({ size }) => sizes[size].step}px;
    white-space: nowrap;
  }
  ${StyledStepContainer}:first-child {
    margin-left: 0px;
  }

  ${StyledStepContainer}:last-child {
    margin-right: 0px;
  }

  ${StyledLine} {
    height: 4px;
    margin-top: ${({ size }) => sizes[size].line}px;
    margin-bottom: ${({ size }) => sizes[size].line}px;
  }

  ${StyledText} {
    margin-top: ${({ size }) => sizes[size].text}px;
    font-size: ${({ size }) => sizes[size].text}px;
  }
`

type CreationProgressProps = {
  animated?: boolean
  isStepsNumber?: boolean
  selected?: number
  size?: Size
  children: ReactNodeArray
}

type CreationProgressComponent = FunctionComponent<CreationProgressProps> & {
  Step: FunctionComponent
}

const CreationProgress: CreationProgressComponent = ({
  children,
  selected = 0,
  animated = true,
  isStepsNumber = false,
  size = 'xlarge',
}) => {
  const lastStep = React.Children.count(children) - 1

  return (
    <StyledContainer size={size}>
      {flattenChildren(children).map((child, index) => {
        const getTemporal = () => {
          if (selected > index) return 'past'

          if (selected === index) return 'current'

          return 'future'
        }
        const isNotLast = index < lastStep
        const temporal = getTemporal()

        const renderStep = () => {
          if (temporal !== 'future') {
            return isStepsNumber ? (
              <Typography color="white" fontWeight={500}>
                {index + 1}
              </Typography>
            ) : (
              <Icon name="check" color="white" size={20} />
            )
          }

          return isStepsNumber ? (
            <Typography color="gray300" fontWeight={500}>
              {index + 1}
            </Typography>
          ) : (
            <StyledFutureInternalDot />
          )
        }

        return (
          // eslint-disable-next-line react/no-array-index-key
          <React.Fragment key={`creation-progress-${index}`}>
            <StyledStepContainer>
              <StyledStep temporal={temporal}>{renderStep()}</StyledStep>

              <StyledText>{child}</StyledText>
            </StyledStepContainer>

            {isNotLast && (
              <StyledLine temporal={temporal} animated={animated} />
            )}
          </React.Fragment>
        )
      })}
    </StyledContainer>
  )
}

const Step: FunctionComponent = ({ children }) => children as JSX.Element

CreationProgress.Step = Step
CreationProgress.Step.displayName = 'CreationProgress.Step'

CreationProgress.propTypes = {
  animated: PropTypes.bool,
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  isStepsNumber: PropTypes.bool,
  selected: PropTypes.number,
  size: PropTypes.oneOf<NonNullable<Size>>(Object.keys(sizes) as Size[]),
}

export default CreationProgress
