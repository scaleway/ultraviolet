import { css } from '@emotion/react'
import PropTypes from 'prop-types'
import React from 'react'
import Dot from '../Dot'
import FlexBox from '../FlexBox'

const DotSteps = ({ steps, step, setStep }) => (
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

DotSteps.defaultProps = {
  step: 1,
  steps: 2,
}

export default DotSteps
