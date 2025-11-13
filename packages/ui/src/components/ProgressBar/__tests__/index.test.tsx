import { shouldMatchSnapshot } from '@utils/test'
import { describe, it } from 'vitest'
import { ProgressBar } from '..'
import { PROGRESS_BAR_SENTIMENTS } from '../constants'

describe('progressBar', () => {
  PROGRESS_BAR_SENTIMENTS.forEach(sentiment => {
    it(`renders ${sentiment}`, () =>
      shouldMatchSnapshot(<ProgressBar sentiment={sentiment} value={40} />))
  })

  it(`renders progression`, () => shouldMatchSnapshot(<ProgressBar progress />))

  it(`renders correctly when value > 100`, () =>
    shouldMatchSnapshot(<ProgressBar value={250} />))

  it(`renders correctly when value < 0`, () =>
    shouldMatchSnapshot(<ProgressBar value={-250} />))

  it(`renders correctly with label, labelDescription and showProgress, direction column`, () =>
    shouldMatchSnapshot(
      <ProgressBar
        label="Label"
        labelDescription="Label"
        showProgress
        value={40}
      />,
    ))

  it(`renders correctly with label, labelDescription and showProgress, direction row`, () =>
    shouldMatchSnapshot(
      <ProgressBar
        direction="row"
        label="Label"
        labelDescription="Label"
        showProgress
        value={40}
      />,
    ))

  it(`renders correctly with label, labelDescription as ReactNode, direction row`, () =>
    shouldMatchSnapshot(
      <ProgressBar
        direction="row"
        label="Label"
        labelDescription={<div>Label</div>}
        value={40}
      />,
    ))

  it(`renders correctly with label, labelDescription as ReactNode, direction column`, () =>
    shouldMatchSnapshot(
      <ProgressBar
        direction="column"
        label="Label"
        labelDescription={<div>Label</div>}
        value={40}
      />,
    ))

  it(`renders correctly with only showProgress, direction row`, () =>
    shouldMatchSnapshot(
      <ProgressBar direction="row" showProgress value={40} />,
    ))

  it(`renders correctly with only showProgress, direction column`, () =>
    shouldMatchSnapshot(
      <ProgressBar direction="column" showProgress value={40} />,
    ))

  it(`renders correctly with only label, direction column`, () =>
    shouldMatchSnapshot(
      <ProgressBar direction="column" label="label" value={40} />,
    ))

  it(`renders correctly with suffix and prefix, direction column`, () =>
    shouldMatchSnapshot(
      <ProgressBar
        direction="column"
        label="label"
        prefix="prefix"
        showProgress
        suffix="suffix"
        value={40}
      />,
    ))

  it(`renders correctly with suffix and prefix, direction row`, () =>
    shouldMatchSnapshot(
      <ProgressBar
        direction="row"
        label="label"
        prefix="prefix"
        showProgress
        suffix="suffix"
        value={40}
      />,
    ))

  it(`renders correctly with max`, () =>
    shouldMatchSnapshot(
      <ProgressBar direction="row" label="label" max={10} value={4} />,
    ))
})
