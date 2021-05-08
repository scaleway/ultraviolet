import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'
import flattenChildren from 'react-flatten-children'
import Box from '../Box'
import Icon from '../Icon'
import Typography from '../Typography'

const sizes = {
  xsmall: {
    line: 5,
    step: 16,
    text: 10,
    stepBorder: 1,
    stepTextMargin: 15,
  },
  small: {
    line: 8,
    step: 20,
    text: 11,
    stepBorder: 2,
    stepTextMargin: 15,
  },
  medium: {
    line: 10,
    step: 24,
    text: 12,
    stepBorder: 2,
    stepTextMargin: 15,
  },
  large: {
    line: 12,
    step: 28,
    text: 14,
    stepBorder: 2,
    stepTextMargin: 15,
  },
  xlarge: {
    line: 14,
    step: 32,
    text: 16,
    stepBorder: 3,
    stepTextMargin: 15,
  },
}

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

const temporalStepStyles = ({ temporal, theme }) =>
  temporal !== 'future'
    ? css`
        background-color: ${theme.colors.success};
      `
    : css`
        background-color: transparent;
        border-style: solid;
        border-color: ${theme.colors.gray350};
      `

const StyledStep = styled('div', {
  shouldForwardProp: prop => !['temporal'].includes(prop),
})`
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
  background-color: ${({ theme: { colors } }) => colors.gray350};
  height: 7px;
  width: 7px;
  border-radius: 16px;
`

const loadingStyle = css`
  animation: ${loadingAnimation} 1s linear infinite;
`

const StyledLine = styled.div`
  border-radius: 2px;
  flex-grow: 1;
  border-radius: 2px;
  background-color: ${({ theme: { colors } }) => colors.gray350};
  position: relative;

  ::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    border-radius: 2px;
    background-color: ${({ theme }) => theme.colors.success};
    ${({ temporal }) => temporal === 'past' && `width: 100%;`}
    ${({ temporal, animated }) =>
      temporal === 'current' && animated && loadingStyle}
  }
`

const StyledContainer = styled(Box)`
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

const CreationProgress = ({
  children,
  selected,
  animated,
  isStepsNumber,
  size,
  ...props
}) => {
  const lastStep = children.length - 1

  return (
    <StyledContainer size={size} {...props}>
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

              <StyledText>{child.props.children}</StyledText>
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

const Step = () => null
CreationProgress.Step = Step

CreationProgress.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  selected: PropTypes.number,
  animated: PropTypes.bool,
  isStepsNumber: PropTypes.bool,
  size: PropTypes.oneOf(Object.keys(sizes)),
}

CreationProgress.defaultProps = {
  selected: 0,
  animated: true,
  isStepsNumber: false,
  size: 'xlarge',
}

export default CreationProgress
