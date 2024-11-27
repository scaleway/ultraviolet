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

  it(`renders correctly with label, labelDescription and showProgress, direction column`, () =>
    shouldMatchEmotionSnapshot(
      <ProgressBar
        value={40}
        showProgress
        label="Label"
        labelDescription="Label"
      />,
    ))

  it(`renders correctly with label, labelDescription and showProgress, direction row`, () =>
    shouldMatchEmotionSnapshot(
      <ProgressBar
        value={40}
        showProgress
        label="Label"
        labelDescription="Label"
        direction="row"
      />,
    ))

  it(`renders correctly with label, labelDescription as ReactNode, direction row`, () =>
    shouldMatchEmotionSnapshot(
      <ProgressBar
        value={40}
        label="Label"
        labelDescription={<div>Label</div>}
        direction="row"
      />,
    ))

  it(`renders correctly with label, labelDescription as ReactNode, direction column`, () =>
    shouldMatchEmotionSnapshot(
      <ProgressBar
        value={40}
        label="Label"
        labelDescription={<div>Label</div>}
        direction="column"
      />,
    ))

  it(`renders correctly with only showProgress, direction row`, () =>
    shouldMatchEmotionSnapshot(
      <ProgressBar value={40} showProgress direction="row" />,
    ))

  it(`renders correctly with only showProgress, direction column`, () =>
    shouldMatchEmotionSnapshot(
      <ProgressBar value={40} showProgress direction="column" />,
    ))

  it(`renders correctly with only label, direction column`, () =>
    shouldMatchEmotionSnapshot(
      <ProgressBar value={40} label="label" direction="column" />,
    ))

  it(`renders correctly with suffix and prefix, direction column`, () =>
    shouldMatchEmotionSnapshot(
      <ProgressBar
        value={40}
        label="label"
        direction="column"
        showProgress
        prefix="prefix"
        suffix="suffix"
      />,
    ))

  it(`renders correctly with suffix and prefix, direction row`, () =>
    shouldMatchEmotionSnapshot(
      <ProgressBar
        value={40}
        label="label"
        direction="row"
        showProgress
        prefix="prefix"
        suffix="suffix"
      />,
    ))

  it(`renders correctly with max`, () =>
    shouldMatchEmotionSnapshot(
      <ProgressBar value={4} label="label" direction="row" max={10} />,
    ))
})
