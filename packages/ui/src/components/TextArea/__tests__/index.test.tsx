import { fireEvent, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme, shouldMatchSnapshot } from '@utils/test'
import { describe, expect, test, vi } from 'vitest'
import { TextArea } from '..'

describe('textArea', () => {
  test('should render correctly with basic props', () =>
    shouldMatchSnapshot(
      <TextArea label="Test" onChange={() => {}} value="test" />,
    ))

  test('should control the value', () => {
    const onChange = vi.fn()

    renderWithTheme(<TextArea label="Test" onChange={onChange} value="test" />)

    const textarea = screen.getByLabelText<HTMLTextAreaElement>('Test')
    expect(textarea.value).toBe('test')
    // userEvent.type do not work here at the moment
    fireEvent.change(textarea, { target: { value: 'another value' } })
    expect(onChange).toHaveBeenCalledWith('another value')
  })

  test('should be clearable', async () => {
    const onChange = vi.fn()

    renderWithTheme(
      <TextArea clearable label="Test" onChange={onChange} value="test" />,
    )

    const textarea = screen.getByLabelText<HTMLTextAreaElement>('Test')
    expect(textarea.value).toBe('test')
    const clearableButton = screen.getByLabelText('clear value')
    await userEvent.click(clearableButton)
    expect(onChange).toHaveBeenCalledWith('')
  })

  test('should render correctly when input is disabled', () =>
    shouldMatchSnapshot(
      <TextArea disabled label="Test" onChange={() => {}} value="test" />,
    ))

  test('should render correctly when input is readOnly', () =>
    shouldMatchSnapshot(
      <TextArea label="Test" onChange={() => {}} readOnly value="test" />,
    ))

  test('should render correctly when it is required', () =>
    shouldMatchSnapshot(
      <TextArea label="Test" onChange={() => {}} required value="test" />,
    ))

  test('should render correctly with maxlength', () =>
    shouldMatchSnapshot(
      <TextArea label="Test" maxLength={3} onChange={() => {}} value="test" />,
    ))

  test('should render correctly when input has a success sentiment', () =>
    shouldMatchSnapshot(
      <TextArea
        label="Test"
        onChange={() => {}}
        success="success"
        value="test"
      />,
    ))

  test('should render correctly when input  has a error sentiment', () =>
    shouldMatchSnapshot(
      <TextArea
        error="success"
        label="Test"
        onChange={() => {}}
        value="test"
      />,
    ))

  test('should render with auto rows', () =>
    shouldMatchSnapshot(
      <TextArea
        error="success"
        label="Test"
        onChange={() => {}}
        rows="auto"
        value="test"
      />,
    ))

  test('should render with AutoExpandMax', () =>
    shouldMatchSnapshot(
      <TextArea
        error="success"
        label="Test"
        maxRows={3}
        onChange={() => {}}
        value="test"
      />,
    ))
  test('should render with AutoExpandMax and rows', () =>
    shouldMatchSnapshot(
      <TextArea
        error="success"
        label="Test"
        maxRows={3}
        onChange={() => {}}
        rows={2}
        value="test"
      />,
    ))

  test('should display success message', () => {
    const onChange = vi.fn()
    const successMessage = 'success message'

    renderWithTheme(
      <TextArea
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
      <TextArea
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
      <TextArea
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
      <TextArea
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
      <TextArea
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
