import { fireEvent, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme, shouldMatchSnapshot } from '@utils/test'
import { describe, expect, test, vi } from 'vitest'
import { TextInput } from '..'

describe('textInput', () => {
  test('should render correctly with basic props', () =>
    shouldMatchSnapshot(
      <TextInput label="Test" onChange={() => {}} value="test" />,
    ))

  test('should control the value', () => {
    const onChange = vi.fn()
    const onChangeValue = vi.fn()

    renderWithTheme(
      <TextInput
        label="Test"
        onChange={onChange}
        onChangeValue={onChangeValue}
        value="test"
      />,
    )

    const textarea = screen.getByLabelText<HTMLInputElement>('Test')
    expect(textarea.value).toBe('test')
    fireEvent.change(textarea, { target: { value: 'another value' } })
    expect(onChange).toHaveBeenCalled()
    expect(onChangeValue).toHaveBeenCalledWith('another value')
  })

  test('should be clearable', async () => {
    const onChange = vi.fn()

    renderWithTheme(
      <TextInput clearable label="Test" onChange={onChange} value="test" />,
    )

    const textarea = screen.getByLabelText<HTMLTextAreaElement>('Test')
    expect(textarea.value).toBe('test')
    const clearableButton = screen.getByLabelText('clear value')
    await userEvent.click(clearableButton)
    expect(onChange).toHaveBeenCalledWith({
      currentTarget: { value: '' },
      target: { value: '' },
    })
  })

  test('should render correctly when input is disabled', () =>
    shouldMatchSnapshot(
      <TextInput disabled label="Test" onChange={() => {}} value="test" />,
    ))

  test('should render correctly when input is readOnly', () =>
    shouldMatchSnapshot(
      <TextInput label="Test" onChange={() => {}} readOnly value="test" />,
    ))

  test('should render correctly when input has a success sentiment', () =>
    shouldMatchSnapshot(
      <TextInput
        label="Test"
        onChange={() => {}}
        success="success"
        value="test"
      />,
    ))

  test('should render correctly when input  has a error sentiment', () =>
    shouldMatchSnapshot(
      <TextInput
        error="success"
        label="Test"
        onChange={() => {}}
        value="test"
      />,
    ))

  test('should display success message', () => {
    const onChange = vi.fn()
    const successMessage = 'success message'

    renderWithTheme(
      <TextInput
        label="Test"
        onChange={onChange}
        success={successMessage}
        value="test"
      />,
    )

    expect(screen.getByText(successMessage)).toBeDefined()
  })

  test('should display error message', () => {
    const onChange = vi.fn()
    const errorMessage = 'error!'

    renderWithTheme(
      <TextInput
        label="Test"
        onChange={onChange}
        success={errorMessage}
        value="test"
      />,
    )

    expect(screen.getByText(errorMessage)).toBeDefined()
  })

  test('should display helper message', () => {
    const onChange = vi.fn()
    const helperMessage = 'helper'

    renderWithTheme(
      <TextInput
        helper={helperMessage}
        label="Test"
        onChange={onChange}
        value="test"
      />,
    )

    expect(screen.getByText(helperMessage)).toBeDefined()
  })

  test('should not display helper message when success is displayed', () => {
    const onChange = vi.fn()
    const successMessage = 'success message'
    const helperMessage = 'helper'

    renderWithTheme(
      <TextInput
        helper={helperMessage}
        label="Test"
        onChange={onChange}
        success={successMessage}
        value="test"
      />,
    )

    expect(screen.getByText(successMessage)).toBeDefined()
    expect(screen.queryByText(helperMessage)).toBeNull()
  })

  test('should not display helper message when error is displayed', () => {
    const onChange = vi.fn()
    const error = 'error!'
    const helperMessage = 'helper'

    renderWithTheme(
      <TextInput
        error={error}
        helper={helperMessage}
        label="Test"
        onChange={onChange}
        value="test"
      />,
    )

    expect(screen.getByText(error)).toBeDefined()
    expect(screen.queryByText(helperMessage)).toBeNull()
  })
})
