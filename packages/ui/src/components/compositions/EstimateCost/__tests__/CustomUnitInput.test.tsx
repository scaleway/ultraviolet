import { screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme, shouldMatchSnapshot } from '@utils/test'
import {
  resetIntersectionMocking,
  setupIntersectionMocking,
} from 'react-intersection-observer/test-utils'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { CustomUnitInput } from '../Components/CustomUnitInput'

describe('estimateCost - CustomUnitInput', () => {
  beforeEach(() => {
    setupIntersectionMocking(vi.fn)
  })
  afterEach(() => {
    resetIntersectionMocking()
  })
  test('render default values', () =>
    shouldMatchSnapshot(
      <CustomUnitInput
        iteration={{ unit: 'hours', value: 1 }}
        setIteration={() => {}}
        timeUnits={['seconds', 'minutes', 'hours', 'days', 'months']}
      />,
    ))

  test('render and trigger on blur when leaving input empty', async () => {
    renderWithTheme(
      <CustomUnitInput
        iteration={{ unit: 'hours', value: 1 }}
        setIteration={() => {}}
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
