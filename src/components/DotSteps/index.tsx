import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, { FunctionComponent } from 'react'
import Dot from '../Dot'
import FlexBox from '../FlexBox'

const DotStep = styled(Dot)`
  margin: ${({ theme }) => theme.space[1]};
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  position: relative;
  &::before,
  &::after {
    position: absolute;
    border-radius: inherit;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &::after {
    content: '';
    width: 18px;
    height: 18px;
  }
  &[aria-selected='true'] {
    background-color: transparent;
    &::before {
      content: '';
      width: 5px;
      height: 5px;
      background-color: currentColor;
    }
    &::after {
      border: 1px solid currentColor;
    }
  }
`

type Props = {
  setStep(index: number): void
  step?: number
  steps?: number
}

const DotSteps: FunctionComponent<Props> = ({
  steps = 2,
  step = 1,
  setStep,
}) => (
  <FlexBox justifyContent="center">
    {Array.from({ length: steps }, (_, i) => (
      <DotStep
        key={`dot-step-${i + 1}`}
        aria-selected={step === i + 1}
        onClick={() => setStep(i + 1)}
      />
    ))}
  </FlexBox>
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
