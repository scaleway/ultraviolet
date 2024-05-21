import { shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, it } from 'vitest'
import { ProgressBar, progressBarSentiments } from '..'

describe('ProgressBar', () => {
  progressBarSentiments.forEach(sentiment => {
    it(`renders ${sentiment}`, () =>
      shouldMatchEmotionSnapshot(
        <ProgressBar value={40} sentiment={sentiment} />,
      ))
  })

  it(`renders progression`, () =>
    shouldMatchEmotionSnapshot(<ProgressBar progress />))

  it(`renders correctly when value > 100`, () =>
    shouldMatchEmotionSnapshot(<ProgressBar value={250} />))

  it(`renders correctly when value < 0`, () =>
    shouldMatchEmotionSnapshot(<ProgressBar value={-250} />))
})
