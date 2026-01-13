import { renderHook, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { mockFormErrors, renderWithTheme } from '@utils/test'
import { useForm } from 'react-hook-form'
import { describe, expect, test, vi } from 'vitest'
import { Form } from '..'

describe('form', () => {
  test('renders correctly with node children', () => {
    const { result } = renderHook(() => useForm())
    const { asFragment } = renderWithTheme(
      <Form
        errors={mockFormErrors}
        methods={result.current}
        onSubmit={() => {}}
      >
        Test
      </Form>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with onSubmit', async () => {
    const onSubmit = vi.fn(() => {})
    const { result } = renderHook(() => useForm())

    const { asFragment } = renderWithTheme(
      <Form
        errors={mockFormErrors}
        methods={result.current}
        onSubmit={onSubmit}
      >
        <button type="submit">Submit</button>
      </Form>,
    )
    await userEvent.click(screen.getByText('Submit'))
    await waitFor(() => expect(onSubmit).toHaveBeenCalledOnce())
    expect(asFragment()).toMatchSnapshot()
  })
})
