import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'
import flattenChildren from 'react-flatten-children'
import { getUUID } from '../../utils'
import Box from '../Box'
import Icon from '../Icon'
import { Typography } from '../Typography'

const loadingAnimation = keyframes`
  from {
    width: 0;
  }

  to {
    width: 100%;
  }
`

const StyledContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  align-self: stretch;
  justify-content: space-between;
`

const StyledStepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120px;
`

const temporalStepStyles = ({ temporal, theme }) =>
  temporal !== 'future'
    ? css`
        background-color: ${theme.colors.success};
      `
    : css`
        height: 32px;
        width: 32px;
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: transparent;
        border-style: solid;
        border-color: ${theme.colors.gray350};
        border-width: 3px;
      `

const StyledStep = styled('div', {
  shouldForwardProp: prop => !['temporal'].includes(prop),
})`
  height: 32px;
  width: 32px;
  border-radius: 16px;
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
  height: 8px;
  width: 8px;
  border-radius: 16px;
`

const StyledLine = styled.div`
  position: relative;
  flex: 1;
  height: 4px;
  margin-left: -36px;
  margin-right: -36px;
  margin-top: 12px;
  border-radius: 2px;
  background-color: ${({ theme: { colors } }) => colors.gray350};
`

const loadingStyle = css`
  animation: ${loadingAnimation} 1s linear infinite;
`

const StyledLineContent = styled('div', {
  shouldForwardProp: prop => !['temporal', 'animated'].includes(prop),
})`
  border-radius: 2px;
  background-color: ${({ theme }) => theme.colors.success};
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  ${({ temporal }) => temporal === 'past' && `width: 100%;`}
  ${({ temporal, animated }) =>
    temporal === 'current' && animated && loadingStyle}
`

const CreationProgress = ({
  children,
  selected,
  animated,
  isStepsNumber,
  ...props
}) => {
  const lastStep = children.length - 1

  return (
    <StyledContainer {...props}>
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
          <React.Fragment key={getUUID()}>
            <StyledStepContainer>
              <StyledStep temporal={temporal}>{renderStep()}</StyledStep>

              <StyledText>{child.props.children}</StyledText>
            </StyledStepContainer>

            {isNotLast && (
              <StyledLine>
                {temporal !== 'future' && (
                  <StyledLineContent temporal={temporal} animated={animated} />
                )}
              </StyledLine>
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
}

CreationProgress.defaultProps = {
  selected: 0,
  animated: true,
  isStepsNumber: false,
}

export default CreationProgress
