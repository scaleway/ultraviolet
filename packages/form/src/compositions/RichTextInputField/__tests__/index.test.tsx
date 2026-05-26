import { renderHook, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { mockFormErrors, renderWithForm, renderWithTheme } from '@utils/test'
import { useForm } from 'react-hook-form'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { RichTextInputField } from '..'
import { Submit } from '../../../components'
import { Form } from '../../../components/Form'

describe('richTextInputField', () => {
  beforeAll(() => {
    Object.defineProperty(document, 'elementFromPoint', {
      value: vi.fn().mockReturnValue(null),
      writable: true,
      configurable: true,
    })
  })
  it('should render correctly', () => {
    const { asFragment } = renderWithForm(<RichTextInputField label="Test" name="test" />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should render correctly generated', async () => {
    const onSubmit = vi.fn()
    const { result } = renderHook(() => useForm<{ test: string }>({ defaultValues: { test: '' } }))

    const { asFragment } = renderWithTheme(
      <Form errors={mockFormErrors} methods={result.current} onSubmit={onSubmit}>
        <RichTextInputField label="Test" name="test" required />
        <Submit>Submit</Submit>
      </Form>,
    )

    await userEvent.click(screen.getByRole('button', { name: 'Submit' }))
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(0)
    })

    const doc = document.querySelector<HTMLDivElement>('[contenteditable="true"]')
    expect(doc).not.toBeNull()
    const editor = doc!
    await userEvent.click(editor)
    await userEvent.type(editor, 'This is an example')
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledOnce()
      expect(onSubmit.mock.calls[0][0]).toStrictEqual({
        test: '<p>This is an example</p>',
      })
    })
    expect(asFragment()).toMatchSnapshot()
  })

  it('should submit rich text with style and list', async () => {
    const onSubmit = vi.fn()
    const { result } = renderHook(() => useForm<{ test: string }>({ defaultValues: { test: '' } }))

    renderWithTheme(
      <Form errors={mockFormErrors} methods={result.current} onSubmit={onSubmit}>
        <RichTextInputField label="Test" name="test" required />
        <Submit>Submit</Submit>
      </Form>,
    )

    const italicButton = screen.getByRole('button', { name: 'Italic' })
    const bulletListButton = screen.getByRole('button', { name: 'Bullet List' })
    expect(italicButton).not.toBeNull()
    expect(bulletListButton).not.toBeNull()

    const doc = document.querySelector<HTMLDivElement>('[contenteditable="true"]')
    expect(doc).not.toBeNull()
    const editor = doc!
    await userEvent.click(editor)
    await userEvent.click(italicButton)
    await userEvent.type(editor, 'Styled ')
    await userEvent.click(bulletListButton)
    await userEvent.type(editor, 'item')
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledOnce()
      expect(onSubmit.mock.calls[0][0]).toStrictEqual({
        test: '<ul><li><p><em>Styled item</em></p></li></ul>',
      })
    })
  })
})
