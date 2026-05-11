import { act, fireEvent, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithForm } from '@utils/test'
import { describe, expect, vi, it } from 'vitest'
import { SelectInputField } from '..'
import { cities, planets } from './resources'

describe('selectInputField', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithForm(<SelectInputField name="test" options={cities} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render correctly disabled', () => {
    const { asFragment } = renderWithForm(<SelectInputField disabled name="test" options={cities} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render correctly multiselect', () => {
    const { asFragment } = renderWithForm(<SelectInputField multiselect name="test" options={cities} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render correctly grouped', () => {
    const { asFragment } = renderWithForm(<SelectInputField multiselect name="test" options={planets} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should display right value on grouped options', async () => {
    const { asFragment } = renderWithForm(<SelectInputField name="test" options={planets} searchable={false} />)
    const select = screen.getByTestId('select-input-test')
    await userEvent.click(select)
    fireEvent.keyDown(select, { key: 'ArrowDown', keyCode: 40 })
    const mercury = screen.getByTestId('option-stack-mercury')

    await userEvent.click(mercury)
    await userEvent.click(select)

    await waitFor(() => {
      expect(screen.getByTestId('option-stack-mercury')).toBeVisible()
    })
    expect(asFragment()).toMatchSnapshot()
  })

  it('should trigger events', async () => {
    const onChange = vi.fn()

    const { asFragment } = renderWithForm(
      <SelectInputField name="test" onChange={onChange} options={planets} searchable={false} />,
    )
    const select = screen.getByTestId('select-input-test')
    await userEvent.click(select)
    const option = screen.getByTestId('option-stack-mercury')

    await userEvent.click(option)
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledOnce()
    })
    act(() => select.blur())

    expect(asFragment()).toMatchSnapshot()
  })
})
