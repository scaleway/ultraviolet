import { css } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, { FunctionComponent } from 'react'
import Dot from '../Dot'
import FlexBox from '../FlexBox'

const dotSize = 10
const DotStep = styled(Dot)`
  margin: ${({ theme }) => theme.space[1]};
  cursor: pointer;
  position: relative;
  background-color: transparent;
  &::before,
  &::after {
    content: '';
    position: absolute;
    border-radius: inherit;
    top: 50%;
    left: 50%;
    transition: transform 0.3s;
  }
  &::before {
    width: ${dotSize}px;
    height: ${dotSize}px;
    margin: ${-dotSize / 2}px;
    background-color: ${({ theme }) => theme.colors.primary.backgroundStrong};
  }
  &::after {
    width: ${dotSize * 2}px;
    height: ${dotSize * 2}px;
    margin: -${dotSize}px;
  }
  &[aria-selected='true'] {
    &::before {
      transform: scale(0.5);
    }
  }
  &[aria-selected='false']:hover {
    &::before {
      transform: scale(1.6);
      transition: transform 0.2s;
    }
  }
  &[aria-selected='false']:last-child::after {
    pointer-events: none;
  }
  &:last-child::after {
    border: 1px solid ${({ theme }) => theme.colors.primary.borderWeak};
  }
`
const selectedStepPosition = (length: number, width: number) =>
  Array.from(
    { length },
    (_, i) => css`
      ${DotStep}:nth-of-type(${length -
      i})[aria-selected='true'] ~ ${DotStep}:last-child:after {
        transform: translateX(-${i * width}px);
      }
    `,
  )

const DotWrapper = styled(FlexBox, {
  shouldForwardProp: prop => prop !== 'steps',
})<{ steps: number }>`
  ${({ theme, steps }) =>
    selectedStepPosition(steps, dotSize + 2 * parseInt(theme.space[1], 10))}
`

type DotStepsProps = {
  setStep(index: number): void
  step?: number
  steps?: number
}

const DotSteps: FunctionComponent<DotStepsProps> = ({
  steps = 2,
  step = 1,
  setStep,
}) => (
  <DotWrapper justifyContent="center" steps={steps}>
    {Array.from({ length: steps }, (_, i) => (
      <DotStep
        key={`dot-step-${i + 1}`}
        aria-selected={step === i + 1}
        onClick={() => setStep(i + 1)}
      />
    ))}
  </DotWrapper>
)

DotSteps.propTypes = {
  /**
   * Change the step when clicking on the dot
   * @param {number} clickedStep The clicked step
   */
  setStep: PropTypes.func.isRequired,
  /**
   * Current step
   */
  step: PropTypes.number,
  /**
   * Total steps length
   */
  steps: PropTypes.number,
}

export default DotSteps
