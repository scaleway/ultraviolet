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
} from '../../../../.jest/helpers'
import { CustomUnitInput } from '../Components/CustomUnitInput'

describe('EstimateCost - CustomUnitInput', () => {
  beforeAll(() => {
    jest.spyOn(Math, 'random').mockReturnValue(0.4155913669444804)
  })

  afterAll(() => {
    jest.spyOn(Math, 'random').mockRestore()
  })

  test('render default values', () =>
    shouldMatchEmotionSnapshot(
      <CustomUnitInput
        setIteration={() => {}}
        iteration={{ value: 1, unit: 'hours' }}
        timeUnits={['seconds', 'minutes', 'hours', 'days', 'months']}
      />,
    ))

  test('render and trigger on blur when leaving input empty', async () => {
    renderWithTheme(
      <CustomUnitInput
        setIteration={() => {}}
        iteration={{ value: 1, unit: 'hours' }}
        timeUnits={['seconds', 'minutes', 'hours', 'days', 'months']}
      />,
    )

    const input = screen.getByRole<HTMLInputElement>('spinbutton')
    await waitFor(() => expect(input.value).toBe('1'))
    await userEvent.click(input)
    await userEvent.type(input, '{ArrowLeft}{Backspace}0')
    await userEvent.tab()

    await waitFor(() => expect(input.value).toBe('1'))
  })
})
