import { act, fireEvent, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithForm } from '@utils/test'
import { describe, expect, test, vi } from 'vitest'
import { TimeField } from '..'

describe('TimeField', () => {
  test('should render correctly', () => {
    const { asFragment } = renderWithForm(<TimeField name="test" />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly disabled', () => {
    const { asFragment } = renderWithForm(<TimeField name="test" disabled />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly checked without value', async () => {
    const { asFragment } = renderWithForm(<TimeField name="test" />, {})
    const input = screen.getByRole('combobox')
    await waitFor(() => expect(input).toHaveAttribute('value', ''))
    expect(asFragment()).toMatchSnapshot()
  })

  test('should trigger events', async () => {
    const onChange = vi.fn()

    const { asFragment } = renderWithForm(
      <TimeField
        name="test"
        onChange={onChange}
        options={[
          { label: '01:00', value: '01:00' },
          { label: '02:00', value: '02:00' },
        ]}
      />,
    )
    const select = screen.getByRole('combobox')
    act(() => select.focus())
    fireEvent.keyDown(select, { key: 'ArrowDown', keyCode: 40 })
    const option =
      // eslint-disable-next-line testing-library/no-node-access
      screen.getByTestId('option-test-01:00').firstChild as HTMLElement
    await userEvent.click(option)
    expect(onChange).toBeCalledTimes(1)
    act(() => select.blur())
    expect(asFragment()).toMatchSnapshot()
  })
})
