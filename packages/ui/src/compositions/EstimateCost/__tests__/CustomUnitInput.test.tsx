import { screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { resetIntersectionMocking, setupIntersectionMocking } from 'react-intersection-observer/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { renderWithTheme, shouldMatchSnapshot } from '../../../__tests__/helpers'
import { CustomUnitInput } from '../Components/CustomUnitInput'

describe('estimateCost - CustomUnitInput', () => {
  beforeEach(() => {
    setupIntersectionMocking(vi.fn)
  })
  afterEach(() => {
    resetIntersectionMocking()
  })
  it('render default values', () =>
    shouldMatchSnapshot(
      <CustomUnitInput
        iteration={{ unit: 'hours', value: 1 }}
        setIteration={() => {}}
        timeUnits={['seconds', 'minutes', 'hours', 'days', 'months']}
      />,
    ))

  it('render and and update when typing a value', async () => {
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
    await userEvent.type(input, '{Backspace}2')
    await userEvent.tab()

    await waitFor(() => expect(input.value).toBe('2'))
  })
})
