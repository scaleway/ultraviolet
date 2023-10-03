import {
  afterAll,
  beforeAll,
  describe,
  expect,
  jest,
  test,
} from '@jest/globals'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  renderWithTheme,
  shouldMatchEmotionSnapshot,
  transformOptions,
} from 'helpers/tests/jestHelpers'
import { EstimateCost } from '..'

jest.setTimeout(10000)

describe('EstimateCost - Unit Item', () => {
  beforeAll(() => {
    jest.spyOn(Math, 'random').mockReturnValue(0.4155913669444804)
  })

  afterAll(() => {
    jest.spyOn(Math, 'random').mockRestore()
  })

  test('render basic props', () =>
    shouldMatchEmotionSnapshot(
      <EstimateCost>
        <EstimateCost.Item label="Unit">
          <EstimateCost.Unit />
        </EstimateCost.Item>
      </EstimateCost>,
      transformOptions,
    ))

  test('render basic props with monthly price', () =>
    shouldMatchEmotionSnapshot(
      <EstimateCost>
        <EstimateCost.Item label="Unit" monthlyPrice={100}>
          <EstimateCost.Unit />
        </EstimateCost.Item>
      </EstimateCost>,
      transformOptions,
    ))

  test('render basic props with values', () =>
    shouldMatchEmotionSnapshot(
      <EstimateCost>
        <EstimateCost.Item
          label="Storage"
          subLabel="50 GB Free"
          price={0.001}
          unit="GB"
          amountFree={50}
          amount={100}
        >
          <EstimateCost.Unit unit="GB" />
        </EstimateCost.Item>
      </EstimateCost>,
      transformOptions,
    ))

  test('render basic props with values and no iteration', () =>
    shouldMatchEmotionSnapshot(
      <EstimateCost>
        <EstimateCost.Item
          label="Storage"
          subLabel="50 GB Free"
          price={0.001}
          unit="GB"
          amountFree={50}
          amount={100}
          noIteration
          maxAmount={100}
        >
          <EstimateCost.Unit unit="GB" />
        </EstimateCost.Item>
      </EstimateCost>,
      transformOptions,
    ))

  test('render test', () =>
    shouldMatchEmotionSnapshot(
      <EstimateCost>
        <EstimateCost.Item
          label="value"
          subLabel="value"
          price={0.001}
          unit="value"
          amountFree={75}
          amount={100}
          hideFromOverlay
        >
          <EstimateCost.Unit unit="value" />
        </EstimateCost.Item>
        <EstimateCost.Item
          label="value"
          subLabel="value"
          price={0.0003}
          unit="value"
          amountFree={75}
          amount={100}
          hideFromOverlay
          noIteration
          maxAmount={150}
        >
          <EstimateCost.Unit unit="value" />
        </EstimateCost.Item>
      </EstimateCost>,
      transformOptions,
    ))

  test('render basic props with overlay', () =>
    shouldMatchEmotionSnapshot(
      <EstimateCost>
        <EstimateCost.Item label="Unit" monthlyPrice={100}>
          <EstimateCost.Unit />
        </EstimateCost.Item>
      </EstimateCost>,
      transformOptions,
    ))

  test('render with 0 amount', () =>
    shouldMatchEmotionSnapshot(
      <EstimateCost>
        <EstimateCost.Item label="Unit" price={10} amount={0}>
          <EstimateCost.Unit />
        </EstimateCost.Item>
      </EstimateCost>,
      transformOptions,
    ))

  test('render with 10 amount', () =>
    shouldMatchEmotionSnapshot(
      <EstimateCost>
        <EstimateCost.Item label="Unit" price={10} amount={10}>
          <EstimateCost.Unit />
        </EstimateCost.Item>
      </EstimateCost>,
      transformOptions,
    ))

  test(`render with value update`, async () => {
    renderWithTheme(
      <EstimateCost>
        <EstimateCost.Item label="Unit">
          <EstimateCost.Unit />
        </EstimateCost.Item>
      </EstimateCost>,
    )

    const input = screen.getAllByRole('spinbutton')[1] as HTMLInputElement
    await waitFor(() => expect(input.value).toBe('1'))
    userEvent.click(input)
    userEvent.type(input, '0')
    await waitFor(() => expect(input.value).toBe('10'))
  })

  test(`render with negative value update`, async () => {
    renderWithTheme(
      <EstimateCost>
        <EstimateCost.Item label="Unit">
          <EstimateCost.Unit />
        </EstimateCost.Item>
      </EstimateCost>,
    )

    const input = screen.getAllByRole('spinbutton')[1] as HTMLInputElement
    await waitFor(() => expect(input.value).toBe('1'))
    userEvent.click(input)
    userEvent.type(input, '{selectall}{del}-1')
    await waitFor(() => expect(input.value).toBe('0'))
  })

  test('render with getAmountValue', () =>
    shouldMatchEmotionSnapshot(
      <EstimateCost>
        <EstimateCost.Item label="Unit" monthlyPrice={100}>
          <EstimateCost.Unit getAmountValue={value => value} />
        </EstimateCost.Item>
      </EstimateCost>,
      transformOptions,
    ))
})
