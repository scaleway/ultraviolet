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
    const lastHtml = onChange.mock.calls.at(-1)?.[0]
    expect(lastHtml).toContain('a')
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

    const italicButton = screen.getByRole('button', { name: 'Italic' })
    await userEvent.click(italicButton)

    const doc = screen.getByLabelText<HTMLDivElement>('Test')
    await userEvent.click(doc)
    await userEvent.type(doc, 'hello')

    expect(onChange).toHaveBeenCalled()
    const lastHtml = onChange.mock.calls.at(-1)?.[0]
    expect(lastHtml).toContain('<em>')
    expect(lastHtml).toContain('</em>')
    expect(lastHtml).toContain('hello')
  })

  test('should apply bullet list formatting', async () => {
    const onChange = vi.fn()

    renderWithTheme(
      <RichTextEditor aria-label="Test" onChange={onChange} value="" />,
    )

    const bulletListButton = screen.getByRole('button', { name: 'Bullet List' })
    await userEvent.click(bulletListButton)

    const doc = screen.getByLabelText<HTMLDivElement>('Test')
    await userEvent.click(doc)
    await userEvent.type(doc, 'item')

    expect(onChange).toHaveBeenCalled()
    const lastHtml = onChange.mock.calls.at(-1)?.[0]
    expect(lastHtml).toContain('<ul>')
    expect(lastHtml).toContain('</ul>')
    expect(lastHtml).toContain('<li>')
    expect(lastHtml).toContain('</li>')
    expect(lastHtml).toContain('item')
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
        id="id-test"
        label="Test"
        onChange={onChange}
        success={successMessage}
        value="test"
      />,
    )

    const status = screen.getByRole('status')
    expect(status).toHaveAttribute('aria-describedby', 'id-test-notice')
    expect(status).toHaveTextContent(successMessage)
  })

  test('should display error message', () => {
    const onChange = vi.fn()
    const errorMessage = 'error!'

    renderWithTheme(
      <RichTextEditor
        id="id-test"
        label="Test"
        onChange={onChange}
        error={errorMessage}
        value="test"
      />,
    )

    const status = screen.getByRole('status')
    expect(status).toHaveAttribute('aria-describedby', 'id-test-notice')
    expect(status).toHaveTextContent(errorMessage)
  })

  test('should display helper message', () => {
    const onChange = vi.fn()
    const helperMessage = 'helper'

    renderWithTheme(
      <RichTextEditor
        id="id-test"
        helper={helperMessage}
        label="Test"
        onChange={onChange}
        value="test"
      />,
    )

    const status = screen.getByRole('status')
    expect(status).toHaveAttribute('aria-describedby', 'id-test-notice')
    expect(status).toHaveTextContent(helperMessage)
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
        id="id-test"
        helper={helperMessage}
        label="Test"
        onChange={onChange}
        error={errorMessage}
        value="test"
      />,
    )

    const status = screen.getByRole('status')
    expect(status).toHaveAttribute('aria-describedby', 'id-test-notice')
    expect(status).toHaveTextContent(errorMessage)
    expect(screen.queryByText(helperMessage)).toBeNull()
  })
})
