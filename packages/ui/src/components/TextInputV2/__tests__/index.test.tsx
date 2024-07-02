import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithTheme, shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, expect, test, vi } from 'vitest'
import { TextInputV2 } from '..'

describe('TextInputV2', () => {
  test('should render correctly with basic props', () =>
    shouldMatchEmotionSnapshot(
      <TextInputV2 label="Test" value="test" onChange={() => {}} />,
    ))

  test('should control the value', async () => {
    const onChange = vi.fn()

    renderWithTheme(
      <TextInputV2 label="Test" value="test" onChange={onChange} />,
    )

    const textarea = screen.getByLabelText<HTMLInputElement>('Test')
    expect(textarea.value).toBe('test')
    await userEvent.type(textarea, 'another value')
    expect(onChange).toHaveBeenCalled()
  })

  test('should be clearable', async () => {
    const onChange = vi.fn()

    renderWithTheme(
      <TextInputV2 label="Test" value="test" onChange={onChange} clearable />,
    )

    const textarea = screen.getByLabelText<HTMLTextAreaElement>('Test')
    expect(textarea.value).toBe('test')
    const clearableButton = screen.getByLabelText('clear value')
    await userEvent.click(clearableButton)
    expect(onChange).toHaveBeenCalledWith({
      target: { value: '' },
      currentTarget: { value: '' },
    })
  })

  test('should render correctly when input is disabled', () =>
    shouldMatchEmotionSnapshot(
      <TextInputV2 label="Test" value="test" onChange={() => {}} disabled />,
    ))

  test('should render correctly when input is readOnly', () =>
    shouldMatchEmotionSnapshot(
      <TextInputV2 label="Test" value="test" onChange={() => {}} readOnly />,
    ))

  test('should render correctly when input has a success sentiment', () =>
    shouldMatchEmotionSnapshot(
      <TextInputV2
        label="Test"
        value="test"
        onChange={() => {}}
        success="success"
      />,
    ))

  test('should render correctly when input  has a error sentiment', () =>
    shouldMatchEmotionSnapshot(
      <TextInputV2
        label="Test"
        value="test"
        onChange={() => {}}
        error="success"
      />,
    ))

  test('should display success message', () => {
    const onChange = vi.fn()
    const successMessage = 'success message'

    renderWithTheme(
      <TextInputV2
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
      <TextInputV2
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
      <TextInputV2
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
      <TextInputV2
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
      <TextInputV2
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
