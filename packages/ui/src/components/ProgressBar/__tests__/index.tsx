import ProgressBar, { progressBarVariants } from '..'
import { shouldMatchEmotionSnapshot } from '../../../../.jest/helpers'

describe('ProgressBar', () => {
  progressBarVariants.forEach(variant => {
    it(`renders ${variant}`, () =>
      shouldMatchEmotionSnapshot(<ProgressBar value={40} variant={variant} />))
  })

  it(`renders progression`, () =>
    shouldMatchEmotionSnapshot(<ProgressBar progress />))

  it(`renders correctly when value > 100`, () =>
    shouldMatchEmotionSnapshot(<ProgressBar value={250} />))

  it(`renders correctly when value < 0`, () =>
    shouldMatchEmotionSnapshot(<ProgressBar value={-250} />))
})
