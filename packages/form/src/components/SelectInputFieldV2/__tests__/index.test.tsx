import { act, fireEvent, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithForm } from '@utils/test'
import { describe, expect, test, vi } from 'vitest'
import { SelectInputFieldV2 } from '..'
import { cities, planets } from './resources'

describe('SelectInputField', () => {
  test('should render correctly', () => {
    const { asFragment } = renderWithForm(
      <SelectInputFieldV2 name="test" options={cities} />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly disabled', () => {
    const { asFragment } = renderWithForm(
      <SelectInputFieldV2 name="test" options={cities} disabled />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly multiselect', () => {
    const { asFragment } = renderWithForm(
      <SelectInputFieldV2 name="test" options={cities} multiselect />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly grouped', () => {
    const { asFragment } = renderWithForm(
      <SelectInputFieldV2 name="test" options={planets} multiselect />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should display right value on grouped options', async () => {
    const { asFragment } = renderWithForm(
      <SelectInputFieldV2 name="test" options={planets} searchable={false} />,
    )
    const select = screen.getByTestId('select-input-test')
    await userEvent.click(select)
    fireEvent.keyDown(select, { key: 'ArrowDown', keyCode: 40 })
    const mercury = screen.getByTestId(`option-stack-mercury`)

    await userEvent.click(mercury)
    await userEvent.click(select)
    await waitFor(() => {
      expect(screen.getByTestId(`option-stack-mercury`)).toBeVisible()
    })
    expect(asFragment()).toMatchSnapshot()
  })

  test('should trigger events', async () => {
    const onChange = vi.fn()

    const { asFragment } = renderWithForm(
      <SelectInputFieldV2
        name="test"
        options={planets}
        searchable={false}
        onChange={onChange}
      />,
    )
    const select = screen.getByTestId('select-input-test')
    await userEvent.click(select)
    const option = screen.getByTestId('option-stack-mercury')

    await userEvent.click(option)
    await waitFor(() => {
      expect(onChange).toBeCalledTimes(1)
    })
    act(() => select.blur())

    expect(asFragment()).toMatchSnapshot()
  })
})
