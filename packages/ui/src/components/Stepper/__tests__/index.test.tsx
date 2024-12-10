import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme, shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, expect, test } from 'vitest'
import { Stepper } from '..'

describe('Stepper', () => {
  test('renders correctly with default props', () =>
    shouldMatchEmotionSnapshot(
      <Stepper>
        <Stepper.Step title="step 1" />
        <Stepper.Step title="step 2" />
        <Stepper.Step title="step 3" />
      </Stepper>,
    ))

  test('renders correctly with selected prop', () =>
    shouldMatchEmotionSnapshot(
      <Stepper selected={2}>
        <Stepper.Step title="step 1" />
        <Stepper.Step title="step 2" />
        <Stepper.Step title="step 3" />
      </Stepper>,
    ))
  test('renders correctly with children', () =>
    shouldMatchEmotionSnapshot(
      <Stepper animated selected={1}>
        <Stepper.Step title="step 1">Children</Stepper.Step>
        <Stepper.Step title="step 2" />
        <Stepper.Step title="step 3" />
      </Stepper>,
    ))
  test('renders correctly with animation', () =>
    shouldMatchEmotionSnapshot(
      <Stepper animated selected={1}>
        <Stepper.Step title="step 1" />
        <Stepper.Step title="step 2" />
        <Stepper.Step title="step 3" />
      </Stepper>,
    ))

  test('renders correctly with all selected', () =>
    shouldMatchEmotionSnapshot(
      <Stepper selected={1}>
        <Stepper.Step title="step 1" />
        <Stepper.Step title="step 2" />
        <Stepper.Step title="step 3" />
      </Stepper>,
    ))

  test('renders correctly with step number in row', () =>
    shouldMatchEmotionSnapshot(
      <Stepper labelPosition="right">
        <Stepper.Step title="step 1" />
        <Stepper.Step title="step 2" />
        <Stepper.Step title="step 3" />
      </Stepper>,
    ))

  test('renders correctly with small size', () =>
    shouldMatchEmotionSnapshot(
      <Stepper size="small">
        <Stepper.Step title="step 1" />
        <Stepper.Step title="step 2" />
        <Stepper.Step title="step 3" />
      </Stepper>,
    ))

  test('renders correctly without separator', () =>
    shouldMatchEmotionSnapshot(
      <Stepper separator={false}>
        <Stepper.Step title="step 1" />
        <Stepper.Step title="step 2" />
        <Stepper.Step title="step 3" />
      </Stepper>,
    ))

  test('renders correctly without separator with label on the right', () =>
    shouldMatchEmotionSnapshot(
      <Stepper separator={false} labelPosition="right">
        <Stepper.Step title="step 1" />
        <Stepper.Step title="step 2" />
        <Stepper.Step title="step 3" />
      </Stepper>,
    ))

  test('renders correctly with disabled steps', () =>
    shouldMatchEmotionSnapshot(
      <Stepper selected={0}>
        <Stepper.Step title="step 1" disabled />
        <Stepper.Step title="step 2" />
        <Stepper.Step title="step 3" disabled />
      </Stepper>,
    ))

  test('handles clicks when interactive', async () => {
    const { asFragment } = renderWithTheme(
      <Stepper selected={1} interactive>
        <Stepper.Step title="step 1" />
        <Stepper.Step title="step 2" />
        <Stepper.Step title="step 3" />
      </Stepper>,
    )
    await userEvent.click(screen.getByTestId('stepper-step-1'))
    await userEvent.click(screen.getByTestId('stepper-step-2')) // should do nothing
    expect(asFragment()).toMatchSnapshot()
  })

  test('handles clicks when interactive and small', async () => {
    const { asFragment } = renderWithTheme(
      <Stepper selected={1} interactive size="small">
        <Stepper.Step title="step 1" />
        <Stepper.Step title="step 2" />
        <Stepper.Step title="step 3" />
      </Stepper>,
    )
    await userEvent.click(screen.getByTestId('stepper-step-1'))
    expect(asFragment()).toMatchSnapshot()
  })

  test('handles clicks when not interactive', async () => {
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

  test('renders correctly without Stepper.Step', () =>
    shouldMatchEmotionSnapshot(
      <Stepper selected={1} size="small">
        <span>Step 1</span>
        <span>Step 2</span>
        <span>Step 3</span>
      </Stepper>,
    ))
})
