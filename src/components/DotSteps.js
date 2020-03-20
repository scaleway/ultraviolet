import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { Box } from '@smooth-ui/core-em'
import { Dot } from './Dot'

export function DotSteps({ steps = 2, step, setStep }) {
  return (
    <Box display="flex" justifyContent="center">
      {Array.from({ length: steps }, (_, i) => (
        <Dot
          key={`dot-step-${i + 1}`}
          color={step === i + 1 ? 'primary' : 'grey'}
          mr={1}
          onClick={() => setStep(i + 1)}
          css={css`
            cursor: pointer;
          `}
        />
      ))}
    </Box>
  )
}

DotSteps.propTypes = {
  steps: PropTypes.number,
  step: PropTypes.number.isRequired,
  setStep: PropTypes.func.isRequired,
}

export default DotSteps
