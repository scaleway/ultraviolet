import { fireEvent, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme, shouldMatchSnapshot } from '@utils/test'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { RichTextInput } from '..'

describe('richTextInput', () => {
  beforeAll(() => {
    if (typeof document.elementFromPoint !== 'function') {
      document.elementFromPoint = vi.fn(() => null)
    }
  })

  it('should render correctly with basic props', () =>
    shouldMatchSnapshot(<RichTextInput aria-label="Test" onChange={() => {}} value="test" />))

  it('should render the value', () => {
    const onChange = vi.fn()

    renderWithTheme(<RichTextInput aria-label="Test" onChange={onChange} value="test" />)

    const doc = screen.getByRole('textbox')
    expect(doc.textContent).toContain('test')
  })

  it('should call onChange when typing', async () => {
    const onChange = vi.fn()

    renderWithTheme(<RichTextInput aria-label="Test" onChange={onChange} value="test" />)

    const doc = screen.getByRole('textbox')
    await userEvent.click(doc)
    await userEvent.type(doc, 'a')

    expect(onChange).toHaveBeenCalled()
    const lastHtml = onChange.mock.calls.at(-1)?.[0]
    expect(lastHtml).toBe('<p>testa</p>')
  })

  it('should return empty string when cleared', async () => {
    const onChange = vi.fn()

    renderWithTheme(<RichTextInput aria-label="Test" onChange={onChange} value="test" />)

    const doc = screen.getByRole('textbox')
    await userEvent.click(doc)
    await userEvent.keyboard('{Control>}{A}{/Control}{Backspace}')

    expect(onChange).toHaveBeenCalled()
    expect(onChange).toHaveBeenLastCalledWith('')
  })

  it('should apply italic formatting', async () => {
    const onChange = vi.fn()

    renderWithTheme(<RichTextInput aria-label="Test" onChange={onChange} value="" />)

    const italicButton = screen.getByRole('button', { name: 'Italic' })
    await userEvent.click(italicButton)

    const doc = screen.getByRole('textbox')
    await userEvent.click(doc)
    await userEvent.type(doc, 'hello')

    expect(onChange).toHaveBeenCalled()
    const lastHtml = onChange.mock.calls.at(-1)?.[0]
    expect(lastHtml).toBe('<p><em>hello</em></p>')
  })

  it('should apply bullet list formatting', async () => {
    const onChange = vi.fn()

    renderWithTheme(<RichTextInput aria-label="Test" onChange={onChange} value="" />)

    const bulletListButton = screen.getByRole('button', { name: 'Bullet List' })
    await userEvent.click(bulletListButton)

    const doc = screen.getByRole('textbox')
    await userEvent.click(doc)
    await userEvent.type(doc, 'item')

    expect(onChange).toHaveBeenCalled()
    const lastHtml = onChange.mock.calls.at(-1)?.[0]
    expect(lastHtml).toBe('<ul><li><p>item</p></li></ul>')
  })

  it('should not be editable when disabled', async () => {
    const onChange = vi.fn()

    renderWithTheme(<RichTextInput aria-label="Test" disabled onChange={onChange} value="test" />)

    const doc = screen.getByRole('textbox')
    fireEvent.focus(doc)
    await userEvent.type(doc, 'a')
    expect(onChange).not.toHaveBeenCalled()
  })

  it('should not be editable when readonly', async () => {
    const onChange = vi.fn()

    renderWithTheme(<RichTextInput aria-label="Test" readOnly onChange={onChange} value="test" />)

    const doc = screen.getByRole('textbox')
    fireEvent.focus(doc)
    await userEvent.type(doc, 'a')
    expect(onChange).not.toHaveBeenCalled()
  })

  it('should display success message', () => {
    const onChange = vi.fn()
    const successMessage = 'success message'

    renderWithTheme(<RichTextInput label="Test" onChange={onChange} success={successMessage} value="test" />)

    const doc = screen.getByRole('textbox')
    expect(doc).toHaveAccessibleDescription(successMessage)
  })

  it('should display error message', () => {
    const onChange = vi.fn()
    const errorMessage = 'error!'

    renderWithTheme(<RichTextInput label="Test" onChange={onChange} error={errorMessage} value="test" />)

    const doc = screen.getByRole('textbox')
    expect(doc).toBeInvalid()
    expect(doc).toHaveAccessibleDescription(errorMessage)
  })

  it('should display helper message', () => {
    const onChange = vi.fn()
    const helperMessage = 'helper'

    renderWithTheme(<RichTextInput helper={helperMessage} label="Test" onChange={onChange} value="test" />)

    const doc = screen.getByRole('textbox')
    expect(doc).toHaveAccessibleDescription(helperMessage)
  })

  it('should not display helper message when success is displayed', () => {
    const onChange = vi.fn()
    const successMessage = 'success message'
    const helperMessage = 'helper'

    renderWithTheme(
      <RichTextInput helper={helperMessage} label="Test" onChange={onChange} success={successMessage} value="test" />,
    )

    const doc = screen.getByRole('textbox')
    expect(doc).toHaveAccessibleDescription(successMessage)
  })

  it('should not display helper message when error is displayed', () => {
    const onChange = vi.fn()
    const errorMessage = 'error!'
    const helperMessage = 'helper'

    renderWithTheme(
      <RichTextInput helper={helperMessage} label="Test" onChange={onChange} error={errorMessage} value="test" />,
    )

    const doc = screen.getByRole('textbox')
    expect(doc).toHaveAccessibleDescription(errorMessage)
  })
})
