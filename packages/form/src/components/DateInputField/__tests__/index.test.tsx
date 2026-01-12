import { screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithForm } from '@utils/test'
import { describe, expect, test, vi } from 'vitest'
import { DateInputField } from '..'

describe('dateInputField', () => {
  test('should render correctly', () => {
    const { asFragment } = renderWithForm(<DateInputField name="test" />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly disabled', () => {
    const { asFragment } = renderWithForm(
      <DateInputField disabled name="test" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should trigger events', async () => {
    const onBlur = vi.fn()
    const onChange = vi.fn()
    const { asFragment, resultForm } = renderWithForm(
      <DateInputField
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
      expect(onChange).toHaveBeenCalledOnce()
    })

    expect(resultForm.current.getValues('test')).toEqual(
      new Date('2022-09-15T00:00:00.000Z'),
    )

    expect(asFragment()).toMatchSnapshot()
  }, 10_000)

  test('should test range', async () => {
    const onBlur = vi.fn()
    const onChange = vi.fn()
    const { asFragment, resultForm } = renderWithForm(
      <DateInputField
        name="test"
        onBlur={onBlur}
        onChange={onChange}
        placeholder="YYYY-MM-DD"
        selectsRange
      />,
      {
        defaultValues: {
          test: [new Date('2022-09-01'), new Date('2022-09-06')],
        },
      },
    )

    const input = screen.getByPlaceholderText<HTMLInputElement>('YYYY-MM-DD')
    await userEvent.click(input)
    await userEvent.click(screen.getByText('18'))
    await userEvent.click(screen.getByText('15'))

    await waitFor(() => {
      expect(onChange).toBeCalledTimes(2)
    })

    expect(resultForm.current.getValues('test')).toEqual([
      new Date('2022-09-15T00:00:00.000Z'),
      new Date('2022-09-18T00:00:00.000Z'),
    ])

    expect(asFragment()).toMatchSnapshot()
  }, 10_000)

  test('should clear field', async () => {
    const onBlur = vi.fn()
    const onChange = vi.fn()
    const { asFragment, resultForm } = renderWithForm(
      <DateInputField
        clearable
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

    const clearButton = screen.getByRole('button', { name: 'clear value' })
    await userEvent.click(clearButton)

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledOnce()
    })

    expect(resultForm.current.getValues('test')).toEqual(null)

    expect(asFragment()).toMatchSnapshot()
  }, 10_000)
})
