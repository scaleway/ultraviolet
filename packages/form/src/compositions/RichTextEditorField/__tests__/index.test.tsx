import { renderHook, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { mockFormErrors, renderWithForm, renderWithTheme } from '@utils/test'
import { useForm } from 'react-hook-form'
import { describe, expect, test, vi } from 'vitest'

import { RichTextEditorField } from '..'
import { Submit } from '../../../components'
import { Form } from '../../../components/Form'

describe('richTextEditorField', () => {
  test('should render correctly', () => {
    const { asFragment } = renderWithForm(
      <RichTextEditorField label="Test" name="test" />,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly generated', async () => {
    const onSubmit = vi.fn()
    const { result } = renderHook(() =>
      useForm<{ test: string }>({ defaultValues: { test: '' } }),
    )

    const { asFragment } = renderWithTheme(
      <Form
        errors={mockFormErrors}
        methods={result.current}
        onSubmit={onSubmit}
      >
        <RichTextEditorField label="Test" name="test" required />
        <Submit>Submit</Submit>
      </Form>,
    )

    await userEvent.click(screen.getByText('Submit'))
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(0)
    })

    const doc = document.querySelector<HTMLDivElement>(
      '[contenteditable="true"]',
    )
    if (!doc) {
      throw new Error('RichTextEditor contenteditable not found')
    }
    await userEvent.click(doc)
    await userEvent.type(doc, 'This is an example')
    await userEvent.click(screen.getByText('Submit'))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledOnce()
      expect(onSubmit.mock.calls[0]?.[0]?.test).toEqual(
        expect.stringContaining('This is an example'),
      )
    })
    expect(asFragment()).toMatchSnapshot()
  })

  test('should submit rich text with style and list', async () => {
    const onSubmit = vi.fn()
    const { result } = renderHook(() =>
      useForm<{ test: string }>({ defaultValues: { test: '' } }),
    )

    renderWithTheme(
      <Form
        errors={mockFormErrors}
        methods={result.current}
        onSubmit={onSubmit}
      >
        <RichTextEditorField label="Test" name="test" required />
        <Submit>Submit</Submit>
      </Form>,
    )

    const italicButton = screen.getByTitle('ItalicIcon').closest('button')
    const bulletListButton = screen
      .getByTitle('ListBulletIcon')
      .closest('button')
    expect(italicButton).not.toBeNull()
    expect(bulletListButton).not.toBeNull()

    const doc = document.querySelector<HTMLDivElement>(
      '[contenteditable="true"]',
    )
    if (!doc) {
      throw new Error('RichTextEditor contenteditable not found')
    }
    await userEvent.click(doc)
    await userEvent.click(italicButton!)
    await userEvent.type(doc, 'Styled ')
    await userEvent.click(bulletListButton!)
    await userEvent.type(doc, 'item')
    await userEvent.click(screen.getByText('Submit'))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledOnce()
      expect(onSubmit.mock.calls[0]?.[0]?.test).toEqual(
        expect.stringContaining('<em>'),
      )
      expect(onSubmit.mock.calls[0]?.[0]?.test).toEqual(
        expect.stringContaining('<ul>'),
      )
      expect(onSubmit.mock.calls[0]?.[0]?.test).toEqual(
        expect.stringContaining('<li>'),
      )
      expect(onSubmit.mock.calls[0]?.[0]?.test).toEqual(
        expect.stringContaining('Styled item'),
      )
    })
  })
})
