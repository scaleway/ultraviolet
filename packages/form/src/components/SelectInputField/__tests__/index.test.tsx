import { act, fireEvent, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithForm } from '@utils/test'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { SelectInputField } from '..'

describe('SelectInputField', () => {
  beforeEach(() => {
    vi.spyOn(global.Math, 'random').mockReturnValue(0.4155913669444804)
  })

  afterEach(() => {
    vi.spyOn(global.Math, 'random').mockRestore()
  })
  test('should render correctly', () => {
    const { asFragment } = renderWithForm(
      <SelectInputField name="test">
        <SelectInputField.Option value="value" label="Label" />
      </SelectInputField>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly disabled', () => {
    const { asFragment } = renderWithForm(
      <SelectInputField name="test" disabled>
        <SelectInputField.Option value="value" label="Label" />
        <SelectInputField.Option value="value2" label="Label 2" />
      </SelectInputField>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly multiple', () => {
    const { asFragment } = renderWithForm(
      <SelectInputField name="test" multiple>
        <SelectInputField.Option value="value" label="Label" />
        <SelectInputField.Option value="value2" label="Label 2" />
      </SelectInputField>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly with a disabled option', () => {
    const { asFragment } = renderWithForm(
      <SelectInputField name="test">
        <SelectInputField.Option value="value" label="Label" />
        <SelectInputField.Option value="value2" label="Label 2" disabled />
      </SelectInputField>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should display right value on grouped options', async () => {
    const selectedOption = { label: 'Group Label', value: 'Group Value' }
    const options = [
      {
        label: 'Group',
        options: [
          selectedOption,
          { label: 'Group Label 2', value: 'Group value2' },
        ],
      },
    ]

    const { asFragment, container } = renderWithForm(
      <SelectInputField name="test" options={options} />,
    )
    const select = screen.getByRole<HTMLInputElement>('combobox')
    act(() => select.focus())
    fireEvent.keyDown(select, { key: 'ArrowDown', keyCode: 40 })
    const option = screen.getByTestId(
      `option-test-${selectedOption.value}`,
      // eslint-disable-next-line testing-library/no-node-access
    ).firstChild as HTMLElement

    await userEvent.click(option)

    // react-select works with a hidden input to handle value.
    // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
    const hiddenSelectInput = container.querySelector(
      'input[type="hidden"]',
    ) as HTMLInputElement

    const { value } = hiddenSelectInput
    expect(value).toBe(selectedOption.value)
    expect(asFragment()).toMatchSnapshot()
  })

  test('should trigger events', async () => {
    const onChange = vi.fn()

    const { asFragment } = renderWithForm(
      <SelectInputField
        name="test"
        options={[
          { label: 'Label', value: 'value' },
          { label: 'Label 2', value: 'value2' },
        ]}
        onChange={onChange}
      />,
    )
    const select = screen.getByRole('combobox')
    fireEvent.keyDown(select, { key: 'ArrowDown', keyCode: 40 })
    const option =
      // eslint-disable-next-line testing-library/no-node-access
      screen.getByTestId('option-test-value').firstChild as HTMLElement

    await userEvent.click(option)
    expect(onChange).toBeCalledTimes(1)
    act(() => select.blur())
    expect(asFragment()).toMatchSnapshot()
  })
})
