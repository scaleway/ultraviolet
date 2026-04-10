import { fireEvent, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme, shouldMatchSnapshot } from '@utils/test'
import { describe, expect, test, vi } from 'vitest'

import { RichTextEditor } from '..'

describe('richTextEditor', () => {
  test('should render correctly with basic props', () =>
    shouldMatchSnapshot(
      <RichTextEditor aria-label="Test" onChange={() => {}} value="test" />,
    ))

  test('should render the value', () => {
    const onChange = vi.fn()

    renderWithTheme(
      <RichTextEditor aria-label="Test" onChange={onChange} value="test" />,
    )

    const doc = screen.getByLabelText<HTMLDivElement>('Test')
    expect(doc.textContent).toContain('test')
  })

  test('should call onChange when typing', async () => {
    const onChange = vi.fn()

    renderWithTheme(
      <RichTextEditor aria-label="Test" onChange={onChange} value="test" />,
    )

    const doc = screen.getByLabelText<HTMLDivElement>('Test')
    await userEvent.click(doc)
    await userEvent.type(doc, 'a')

    expect(onChange).toHaveBeenCalled()
    expect(onChange).toHaveBeenLastCalledWith(expect.stringContaining('a'))
  })

  test('should return empty string when cleared', async () => {
    const onChange = vi.fn()

    renderWithTheme(
      <RichTextEditor aria-label="Test" onChange={onChange} value="test" />,
    )

    const doc = screen.getByLabelText<HTMLDivElement>('Test')
    await userEvent.click(doc)
    await userEvent.keyboard('{Control>}{A}{/Control}{Backspace}')

    expect(onChange).toHaveBeenCalled()
    expect(onChange).toHaveBeenLastCalledWith('')
  })

  test('should apply italic formatting', async () => {
    const onChange = vi.fn()

    renderWithTheme(
      <RichTextEditor aria-label="Test" onChange={onChange} value="" />,
    )

    const italicButton = screen.getByTitle('ItalicIcon').closest('button')
    expect(italicButton).not.toBeNull()

    await userEvent.click(italicButton!)

    const doc = screen.getByLabelText<HTMLDivElement>('Test')
    await userEvent.click(doc)
    await userEvent.type(doc, 'hello')

    expect(onChange).toHaveBeenCalled()
    expect(onChange).toHaveBeenLastCalledWith(expect.stringContaining('<em>'))
    expect(onChange).toHaveBeenLastCalledWith(expect.stringContaining('hello'))
  })

  test('should apply bullet list formatting', async () => {
    const onChange = vi.fn()

    renderWithTheme(
      <RichTextEditor aria-label="Test" onChange={onChange} value="" />,
    )

    const bulletListButton = screen
      .getByTitle('ListBulletIcon')
      .closest('button')
    expect(bulletListButton).not.toBeNull()

    await userEvent.click(bulletListButton!)

    const doc = screen.getByLabelText<HTMLDivElement>('Test')
    await userEvent.click(doc)
    await userEvent.type(doc, 'item')

    expect(onChange).toHaveBeenCalled()
    expect(onChange).toHaveBeenLastCalledWith(expect.stringContaining('<ul>'))
    expect(onChange).toHaveBeenLastCalledWith(expect.stringContaining('<li>'))
    expect(onChange).toHaveBeenLastCalledWith(expect.stringContaining('item'))
  })

  test('should not be editable when disabled', async () => {
    const onChange = vi.fn()

    renderWithTheme(
      <RichTextEditor
        aria-label="Test"
        disabled
        onChange={onChange}
        value="test"
      />,
    )

    expect(screen.queryByRole('button')).toBeNull()

    const doc = screen.getByLabelText<HTMLDivElement>('Test')
    fireEvent.focus(doc)
    await userEvent.type(doc, 'a')
    expect(onChange).not.toHaveBeenCalled()
  })

  test('should display success message', () => {
    const onChange = vi.fn()
    const successMessage = 'success message'

    renderWithTheme(
      <RichTextEditor
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
      <RichTextEditor
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
      <RichTextEditor
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
      <RichTextEditor
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
    const errorMessage = 'error!'
    const helperMessage = 'helper'

    renderWithTheme(
      <RichTextEditor
        helper={helperMessage}
        label="Test"
        onChange={onChange}
        success={errorMessage}
        value="test"
      />,
    )
  })
})
