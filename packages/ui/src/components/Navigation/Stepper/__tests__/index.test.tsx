import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme, shouldMatchSnapshot } from '@utils/test'
import { describe, expect, it } from 'vitest'
import { Stepper } from '..'

describe('stepper', () => {
  it('renders correctly with default props', () =>
    shouldMatchSnapshot(
      <Stepper>
        <Stepper.Step title="step 1" />
        <Stepper.Step title="step 2" />
        <Stepper.Step title="step 3" />
      </Stepper>,
    ))

  it('renders correctly with selected prop', () =>
    shouldMatchSnapshot(
      <Stepper selected={2}>
        <Stepper.Step title="step 1" />
        <Stepper.Step title="step 2" />
        <Stepper.Step title="step 3" />
      </Stepper>,
    ))
  it('renders correctly with children', () =>
    shouldMatchSnapshot(
      <Stepper animated selected={1}>
        <Stepper.Step title="step 1">Children</Stepper.Step>
        <Stepper.Step title="step 2" />
        <Stepper.Step title="step 3" />
      </Stepper>,
    ))
  it('renders correctly with animation', () =>
    shouldMatchSnapshot(
      <Stepper animated selected={1}>
        <Stepper.Step title="step 1" />
        <Stepper.Step title="step 2" />
        <Stepper.Step title="step 3" />
      </Stepper>,
    ))

  it('renders correctly with all selected', () =>
    shouldMatchSnapshot(
      <Stepper selected={1}>
        <Stepper.Step title="step 1" />
        <Stepper.Step title="step 2" />
        <Stepper.Step title="step 3" />
      </Stepper>,
    ))

  it('renders correctly with step number in row', () =>
    shouldMatchSnapshot(
      <Stepper labelPosition="right">
        <Stepper.Step title="step 1" />
        <Stepper.Step title="step 2" />
        <Stepper.Step title="step 3" />
      </Stepper>,
    ))

  it('renders correctly with small size', () =>
    shouldMatchSnapshot(
      <Stepper size="small">
        <Stepper.Step title="step 1" />
        <Stepper.Step title="step 2" />
        <Stepper.Step title="step 3" />
      </Stepper>,
    ))

  it('renders correctly without separator', () =>
    shouldMatchSnapshot(
      <Stepper separator={false}>
        <Stepper.Step title="step 1" />
        <Stepper.Step title="step 2" />
        <Stepper.Step title="step 3" />
      </Stepper>,
    ))

  it('renders correctly without separator with label on the right', () =>
    shouldMatchSnapshot(
      <Stepper labelPosition="right" separator={false}>
        <Stepper.Step title="step 1" />
        <Stepper.Step title="step 2" />
        <Stepper.Step title="step 3" />
      </Stepper>,
    ))

  it('renders correctly with disabled steps', () =>
    shouldMatchSnapshot(
      <Stepper selected={0}>
        <Stepper.Step disabled title="step 1" />
        <Stepper.Step title="step 2" />
        <Stepper.Step disabled title="step 3" />
      </Stepper>,
    ))

  it('handles clicks when interactive', async () => {
    const { asFragment } = renderWithTheme(
      <Stepper interactive selected={1}>
        <Stepper.Step title="step 1" />
        <Stepper.Step title="step 2" />
        <Stepper.Step title="step 3" />
      </Stepper>,
    )
    await userEvent.click(screen.getByTestId('stepper-step-1'))
    await userEvent.click(screen.getByTestId('stepper-step-2')) // should do nothing
    expect(asFragment()).toMatchSnapshot()
  })

  it('handles clicks when interactive and small', async () => {
    const { asFragment } = renderWithTheme(
      <Stepper interactive selected={1} size="small">
        <Stepper.Step title="step 1" />
        <Stepper.Step title="step 2" />
        <Stepper.Step title="step 3" />
      </Stepper>,
    )
    await userEvent.click(screen.getByTestId('stepper-step-1'))
    expect(asFragment()).toMatchSnapshot()
  })

  it('handles clicks when not interactive', async () => {
    const { asFragment } = renderWithTheme(
      <Stepper selected={1} size="small">
        <Stepper.Step title="step 1" />
        <Stepper.Step title="step 2" />
        <Stepper.Step title="step 3" />
      </Stepper>,
    )

    await userEvent.click(screen.getByTestId('stepper-step-1'))
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly without Stepper.Step', () =>
    shouldMatchSnapshot(
      <Stepper selected={1} size="small">
        <span>Step 1</span>
        <span>Step 2</span>
        <span>Step 3</span>
      </Stepper>,
    ))
})
