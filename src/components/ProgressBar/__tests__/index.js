import React from 'react'
import { ProgressBar, progressBarVariants } from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('ProgressBar', () => {
  progressBarVariants.forEach(variant => {
    it(`renders ${variant}`, () => {
      shouldMatchEmotionSnapshot(<ProgressBar value={40} variant={variant} />)
    })
  })

  it(`renders with different background`, () => {
    shouldMatchEmotionSnapshot(
      <ProgressBar value={40} backgroundColor="yellow" />,
    )
  })

  it(`renders progression`, () => {
    shouldMatchEmotionSnapshot(<ProgressBar progress />)
  })
})
