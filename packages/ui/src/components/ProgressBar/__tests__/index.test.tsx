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

  it(`renders correctly with label, label description and showprogress, direction column`, () =>
    shouldMatchEmotionSnapshot(
      <ProgressBar
        value={40}
        showProgress
        label="Label"
        labelDescription="Label"
      />,
    ))

  it(`renders correctly with label, label description and showprogress, direction row`, () =>
    shouldMatchEmotionSnapshot(
      <ProgressBar
        value={40}
        showProgress
        label="Label"
        labelDescription="Label"
        direction="row"
      />,
    ))

  it(`renders correctly with only showprogress, direction row`, () =>
    shouldMatchEmotionSnapshot(
      <ProgressBar value={40} showProgress direction="row" />,
    ))

  it(`renders correctly with only showprogress, direction column`, () =>
    shouldMatchEmotionSnapshot(
      <ProgressBar value={40} showProgress direction="column" />,
    ))

  it(`renders correctly with only label, direction column`, () =>
    shouldMatchEmotionSnapshot(
      <ProgressBar value={40} label="label" direction="column" />,
    ))
})
