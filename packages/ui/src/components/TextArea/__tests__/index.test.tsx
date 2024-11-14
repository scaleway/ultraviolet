import { fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithTheme, shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, expect, test, vi } from 'vitest'
import { TextArea } from '..'

describe('TextArea', () => {
  test('should render correctly with basic props', () =>
    shouldMatchEmotionSnapshot(
      <TextArea label="Test" value="test" onChange={() => {}} />,
    ))

  test('should control the value', () => {
    const onChange = vi.fn()

    renderWithTheme(<TextArea label="Test" value="test" onChange={onChange} />)

    const textarea = screen.getByLabelText<HTMLTextAreaElement>('Test')
    expect(textarea.value).toBe('test')
    // userEvent.type do not work here at the moment
    fireEvent.change(textarea, { target: { value: 'another value' } })
    expect(onChange).toHaveBeenCalledWith('another value')
  })

  test('should be clearable', async () => {
    const onChange = vi.fn()

    renderWithTheme(
      <TextArea label="Test" value="test" onChange={onChange} clearable />,
    )

    const textarea = screen.getByLabelText<HTMLTextAreaElement>('Test')
    expect(textarea.value).toBe('test')
    const clearableButton = screen.getByLabelText('clear value')
    await userEvent.click(clearableButton)
    expect(onChange).toHaveBeenCalledWith('')
  })

  test('should render correctly when input is disabled', () =>
    shouldMatchEmotionSnapshot(
      <TextArea label="Test" value="test" onChange={() => {}} disabled />,
    ))

  test('should render correctly when input is readOnly', () =>
    shouldMatchEmotionSnapshot(
      <TextArea label="Test" value="test" onChange={() => {}} readOnly />,
    ))

  test('should render correctly when it is required', () =>
    shouldMatchEmotionSnapshot(
      <TextArea label="Test" value="test" onChange={() => {}} required />,
    ))

  test('should render correctly with maxlength', () =>
    shouldMatchEmotionSnapshot(
      <TextArea label="Test" value="test" onChange={() => {}} maxLength={3} />,
    ))

  test('should render correctly when input has a success sentiment', () =>
    shouldMatchEmotionSnapshot(
      <TextArea
        label="Test"
        value="test"
        onChange={() => {}}
        success="success"
      />,
    ))

  test('should render correctly when input  has a error sentiment', () =>
    shouldMatchEmotionSnapshot(
      <TextArea
        label="Test"
        value="test"
        onChange={() => {}}
        error="success"
      />,
    ))

  test('should render with auto rows', () =>
    shouldMatchEmotionSnapshot(
      <TextArea
        label="Test"
        value="test"
        onChange={() => {}}
        error="success"
        rows="auto"
      />,
    ))

  test('should render with AutoExpandMax', () =>
    shouldMatchEmotionSnapshot(
      <TextArea
        label="Test"
        value="test"
        onChange={() => {}}
        error="success"
        autoExpandMax={3}
      />,
    ))
  test('should render with AutoExpandMax and rows', () =>
    shouldMatchEmotionSnapshot(
      <TextArea
        label="Test"
        value="test"
        onChange={() => {}}
        error="success"
        rows={2}
        autoExpandMax={3}
      />,
    ))

  test('should display success message', () => {
    const onChange = vi.fn()
    const successMessage = 'success message'

    renderWithTheme(
      <TextArea
        label="Test"
        value="test"
        onChange={onChange}
        success={successMessage}
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
        value="test"
        onChange={onChange}
        success={errorMessage}
      />,
    )

    expect(screen.getByText(errorMessage)).toBeDefined()
  })

  test('should display helper message', () => {
    const onChange = vi.fn()
    const helperMessage = 'helper'

    renderWithTheme(
      <TextArea
        label="Test"
        value="test"
        onChange={onChange}
        helper={helperMessage}
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
        label="Test"
        value="test"
        onChange={onChange}
        success={successMessage}
        helper={helperMessage}
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
        label="Test"
        value="test"
        onChange={onChange}
        error={error}
        helper={helperMessage}
      />,
    )

    expect(screen.getByText(error)).toBeDefined()
    expect(screen.queryByText(helperMessage)).toBeNull()
  })
})
