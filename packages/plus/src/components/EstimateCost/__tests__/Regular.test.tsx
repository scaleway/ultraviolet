import { screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme, shouldMatchEmotionSnapshot } from '@utils/test'
import {
  resetIntersectionMocking,
  setupIntersectionMocking,
} from 'react-intersection-observer/test-utils'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { EstimateCost } from '..'

const OverlaySubmitButton = () => <div>Submit</div>

describe('EstimateCost - Regular Item', () => {
  beforeEach(() => {
    setupIntersectionMocking(vi.fn)
  })

  afterEach(() => {
    resetIntersectionMocking()
  })

  test('render basic props', () =>
    shouldMatchEmotionSnapshot(
      <EstimateCost description="Custom Description">
        <EstimateCost.Item label="Regular">
          <EstimateCost.Regular>This is a regular Item</EstimateCost.Regular>
        </EstimateCost.Item>
      </EstimateCost>,
    ))

  test('render basic props with overlay', () =>
    shouldMatchEmotionSnapshot(
      <EstimateCost
        OverlayLeft={OverlaySubmitButton}
        OverlayRight={OverlaySubmitButton}
      >
        <EstimateCost.Item label="Regular">
          <EstimateCost.Regular>
            <EstimateCost.Ellipsis>
              This is a regular Item
            </EstimateCost.Ellipsis>
          </EstimateCost.Regular>
        </EstimateCost.Item>
        <EstimateCost.Item hideFromOverlay label="Regular" shouldBeHidden>
          <EstimateCost.Regular>Hidden element in overlay</EstimateCost.Regular>
        </EstimateCost.Item>
      </EstimateCost>,
    ))

  test('render basic props with overlay beta', () =>
    shouldMatchEmotionSnapshot(
      <EstimateCost isBeta OverlayRight={OverlaySubmitButton}>
        <EstimateCost.Item
          amount={0}
          label="Regular"
          maxAmount={100}
          price={0.001}
        >
          <EstimateCost.Regular>
            <EstimateCost.Ellipsis>
              This is a regular Item 1
            </EstimateCost.Ellipsis>
          </EstimateCost.Regular>
          <EstimateCost.Regular>This is a regular Item 2</EstimateCost.Regular>
        </EstimateCost.Item>
      </EstimateCost>,
    ))

  test('render basic props with long fractions digits', () =>
    shouldMatchEmotionSnapshot(
      <EstimateCost>
        <EstimateCost.Item label="Regular" longFractionDigits price={0.000001}>
          <EstimateCost.Regular>This is a regular Item</EstimateCost.Regular>
        </EstimateCost.Item>
      </EstimateCost>,
    ))

  test('render basic props with maxPrice and longFractionDigits', () =>
    shouldMatchEmotionSnapshot(
      <EstimateCost>
        <EstimateCost.Item
          amount={10}
          label="Regular"
          longFractionDigits
          maxAmount={100}
          price={0.000001}
        >
          <EstimateCost.Regular>This is a regular Item</EstimateCost.Regular>
        </EstimateCost.Item>
      </EstimateCost>,
    ))

  test('render basic props with maxPrice', () =>
    shouldMatchEmotionSnapshot(
      <EstimateCost>
        <EstimateCost.Item
          amount={0}
          label="Regular"
          maxAmount={100}
          price={0.000001}
          unit="Node"
        >
          <EstimateCost.Regular>This is a regular Item</EstimateCost.Regular>
        </EstimateCost.Item>
      </EstimateCost>,
    ))

  test('render basic props with is not defined', () =>
    shouldMatchEmotionSnapshot(
      <EstimateCost>
        <EstimateCost.Item isDefined={false} label="Regular">
          <EstimateCost.Regular>This is a regular Item</EstimateCost.Regular>
        </EstimateCost.Item>
      </EstimateCost>,
    ))

  test('render basic props with sublabel', () =>
    shouldMatchEmotionSnapshot(
      <EstimateCost>
        <EstimateCost.Item label="Regular" subLabel="Excellent">
          <EstimateCost.Regular>This is a regular Item</EstimateCost.Regular>
        </EstimateCost.Item>
      </EstimateCost>,
    ))

  test('render basic props with textNotDefined', () =>
    shouldMatchEmotionSnapshot(
      <EstimateCost>
        <EstimateCost.Item label="Regular" textNotDefined="Not defined">
          <EstimateCost.Regular>This is a regular Item</EstimateCost.Regular>
        </EstimateCost.Item>
      </EstimateCost>,
    ))

  test('render basic with ellipsis', () =>
    shouldMatchEmotionSnapshot(
      <EstimateCost>
        <EstimateCost.Item label="Regular" textNotDefined="Not defined">
          <EstimateCost.Regular>
            <EstimateCost.Ellipsis>
              This is a regular Item
            </EstimateCost.Ellipsis>
          </EstimateCost.Regular>
        </EstimateCost.Item>
      </EstimateCost>,
    ))

  test('render with isDisabledOnOverlay', () =>
    shouldMatchEmotionSnapshot(
      <EstimateCost>
        <EstimateCost.Item label="Regular">
          <EstimateCost.Regular isDisabledOnOverlay>
            This is a regular Item
          </EstimateCost.Regular>
        </EstimateCost.Item>
      </EstimateCost>,
    ))

  test('render with alert', () =>
    shouldMatchEmotionSnapshot(
      <EstimateCost
        alert="this is an alert"
        alertTitle="this is an alert title"
      >
        <EstimateCost.Item label="Regular">
          <EstimateCost.Regular>This is a regular Item</EstimateCost.Regular>
        </EstimateCost.Item>
      </EstimateCost>,
    ))

  test(`render with hourly price range`, async () => {
    renderWithTheme(
      <EstimateCost>
        <EstimateCost.Item
          amount={1}
          label="Node options"
          maxAmount={10}
          price={0.0001}
          unit="node"
        >
          <EstimateCost.Regular>1 - 10 Nodes</EstimateCost.Regular>
        </EstimateCost.Item>
      </EstimateCost>,
    )

    const input = screen.getByRole<HTMLInputElement>('spinbutton')
    await waitFor(() => expect(input.value).toBe('1'))
    await userEvent.click(input)
    await userEvent.type(input, '0')
    await waitFor(() => expect(input.value).toBe('10'))
  })

  test(`render with hourly price range and longFractionDigits`, async () => {
    renderWithTheme(
      <EstimateCost>
        <EstimateCost.Item
          amount={1}
          label="Node options"
          longFractionDigits
          maxAmount={10}
          price={0.0001}
          unit="node"
        >
          <EstimateCost.Regular>1 - 10 Nodes</EstimateCost.Regular>
        </EstimateCost.Item>
      </EstimateCost>,
    )

    const input = screen.getByRole<HTMLInputElement>('spinbutton')
    await waitFor(() => expect(input.value).toBe('1'))
    await userEvent.click(input)
    await userEvent.type(input, '0')
    await waitFor(() => expect(input.value).toBe('10'))
  })
})
