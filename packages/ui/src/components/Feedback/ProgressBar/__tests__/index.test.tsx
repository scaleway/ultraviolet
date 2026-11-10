import { renderWithTheme } from '@utils/test'
import { describe, expect, it } from 'vitest'
import { ProgressBar } from '..'
import { PROGRESS_BAR_SENTIMENTS } from '../constants'

describe('progressBar', () => {
  it.each(PROGRESS_BAR_SENTIMENTS)(`renders %s`, sentiment => {
    const { asFragment } = renderWithTheme(<ProgressBar sentiment={sentiment} value={40} />)

    expect(asFragment()).toMatchSnapshot()
  })

  it.each(['small', 'medium', 'large'] as const)(`renders %s`, size => {
    const { asFragment } = renderWithTheme(<ProgressBar size={size} value={40} />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders progression', () => {
    const { asFragment } = renderWithTheme(<ProgressBar progress />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly when value > 100', () => {
    const { asFragment } = renderWithTheme(<ProgressBar value={250} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly when value < 0', () => {
    const { asFragment } = renderWithTheme(<ProgressBar value={-250} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with label, labelDescription and showProgress, direction column', () => {
    const { asFragment } = renderWithTheme(
      <ProgressBar label="Label" labelDescription="Label" showProgress value={40} />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with label, labelDescription and showProgress, direction row', () => {
    const { asFragment } = renderWithTheme(
      <ProgressBar direction="row" label="Label" labelDescription="Label" showProgress value={40} />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with label, labelDescription as ReactNode, direction row', () => {
    const { asFragment } = renderWithTheme(
      <ProgressBar direction="row" label="Label" labelDescription={<div>Label</div>} value={40} />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with label, labelDescription as ReactNode, direction column', () => {
    const { asFragment } = renderWithTheme(
      <ProgressBar direction="column" label="Label" labelDescription={<div>Label</div>} value={40} />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with only showProgress, direction row', () => {
    const { asFragment } = renderWithTheme(<ProgressBar direction="row" showProgress value={40} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with only showProgress, direction column', () => {
    const { asFragment } = renderWithTheme(<ProgressBar direction="column" showProgress value={40} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with only label, direction column', () => {
    const { asFragment } = renderWithTheme(<ProgressBar direction="column" label="label" value={40} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with suffix and prefix, direction column', () => {
    const { asFragment } = renderWithTheme(
      <ProgressBar direction="column" label="label" prefix="prefix" showProgress suffix="suffix" value={40} />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with suffix and prefix, direction row', () => {
    const { asFragment } = renderWithTheme(
      <ProgressBar direction="row" label="label" prefix="prefix" showProgress suffix="suffix" value={40} />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with max', () => {
    const { asFragment } = renderWithTheme(<ProgressBar direction="row" label="label" max={10} value={4} />)
    expect(asFragment()).toMatchSnapshot()
  })
})
