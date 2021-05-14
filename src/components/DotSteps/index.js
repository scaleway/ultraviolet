import { css } from '@emotion/react'
import PropTypes from 'prop-types'
import React from 'react'
import Box from '../Box'
import Dot from '../Dot'

const DotSteps = ({ steps, step, setStep }) => (
  <Box display="flex" justifyContent="center">
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
  </Box>
)

DotSteps.propTypes = {
  setStep: PropTypes.func.isRequired,
  step: PropTypes.number,
  steps: PropTypes.number,
}

DotSteps.defaultProps = {
  step: 1,
  steps: 2,
}

export default DotSteps
