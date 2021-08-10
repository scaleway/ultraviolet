import { css } from '@emotion/react'
import PropTypes from 'prop-types'
import React, { FunctionComponent } from 'react'
import Dot from '../Dot'
import FlexBox from '../FlexBox'

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
      <Dot
        key={`dot-step-${i + 1}`}
        color={step === i + 1 ? 'primary' : 'gray'}
        mr={i + 1 < steps ? 1 : 0}
        onClick={() => setStep(i + 1)}
        css={css`
          cursor: pointer;
        `}
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
