import { screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithForm } from '@utils/test'
import { describe, expect, test, vi } from 'vitest'
import { DateField } from '..'

describe('DateField', () => {
  test('should render correctly', () => {
    const { asFragment } = renderWithForm(<DateField name="test" />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly disabled', () => {
    const { asFragment } = renderWithForm(<DateField name="test" disabled />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('should trigger events', async () => {
    const onBlur = vi.fn()
    const onChange = vi.fn()
    const { asFragment } = renderWithForm(
      <DateField
        name="test"
        onBlur={onBlur}
        onChange={onChange}
        placeholder="YYYY-MM-DD"
      />,
      {
        defaultValues: {
          test: new Date('2022-09-01'),
        },
      },
    )

    const input = screen.getByPlaceholderText<HTMLInputElement>('YYYY-MM-DD')
    await userEvent.click(input)
    await userEvent.click(screen.getByText('15'))
    await waitFor(() => {
      expect(onChange).toBeCalledTimes(1)
    })

    expect(asFragment()).toMatchSnapshot()
  }, 10000)
})
