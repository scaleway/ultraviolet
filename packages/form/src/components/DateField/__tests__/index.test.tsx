import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
      <DateField name="test" onBlur={onBlur} onChange={onChange} />,
      {
        defaultValues: {
          test: new Date('2022-09-01'),
        },
      },
    )
    const select = screen.getByRole('textbox')
    await userEvent.type(select, '{ArrowDown}')
    const option = screen.getAllByRole('option')[0]
    await userEvent.click(option)
    expect(onChange).toBeCalledTimes(1)
    // Blur not working on react-datepicker:
    // https://github.com/Hacker0x01/react-datepicker/issues/2028
    // act(() => {
    //   select.blur()
    // })
    // expect(onBlur).toBeCalledTimes(1)
    expect(asFragment()).toMatchSnapshot()
  }, 10000)
})
