import { screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { TextAreaField } from '..'
import { Submit } from '../..'
import { mockFormErrors, renderWithForm } from '../../../__tests__/helpers'

describe('textAreaField', () => {
  beforeEach(() => {
    const mockTextareaStyle = { lineHeight: '16px' } as CSSStyleDeclaration
    vi.spyOn(globalThis, 'getComputedStyle').mockReturnValue(mockTextareaStyle)
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should render correctly', () => {
    const { asFragment } = renderWithForm({ children: <TextAreaField label="Test" name="test" /> })
    expect(asFragment()).toMatchSnapshot()
  })

  it('should submit with onSubmitEnter prop', async () => {
    const onSubmit = vi.fn()

    const { asFragment } = renderWithForm({
      children: (
        <>
          <TextAreaField label="Test" name="test" submitOnEnter />
          <Submit>Submit</Submit>
        </>
      ),
      formProps: { errors: mockFormErrors, onSubmit },
    })

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(0)
    })
    const textareaInput = screen.getByLabelText('Test')
    await userEvent.type(textareaInput, 'This is an example{Enter}')
    await waitFor(() => {
      expect(onSubmit.mock.calls[0][0]).toStrictEqual({
        test: 'This is an example',
      })
    })
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render correctly generated', async () => {
    const onSubmit = vi.fn()

    const { asFragment } = renderWithForm({
      children: (
        <>
          <TextAreaField clearable label="Test" name="test" required />
          <Submit>Submit</Submit>
        </>
      ),
      formProps: { errors: mockFormErrors, onSubmit },
    })

    await userEvent.click(screen.getByText('Submit'))
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(0)
    })
    const textareaInput = screen.getByLabelText('Test')
    await userEvent.type(textareaInput, 'This is an example')
    await userEvent.click(screen.getByText('Submit'))
    await waitFor(() => {
      expect(onSubmit.mock.calls[0][0]).toStrictEqual({
        test: 'This is an example',
      })
    })
    expect(asFragment()).toMatchSnapshot()
  })
})
