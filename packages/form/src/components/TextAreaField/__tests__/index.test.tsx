import { screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { mockFormErrors, renderWithForm } from '@utils/test'
import { describe, expect, it, vi } from 'vitest'
import { TextAreaField } from '..'
import { Submit } from '../..'

describe('textAreaField', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithForm(<TextAreaField label="Test" name="test" />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should submit with onSubmitEnter prop', async () => {
    const onSubmit = vi.fn()

    const { asFragment } = renderWithForm(
      <>
        <TextAreaField label="Test" name="test" submitOnEnter />
        <Submit>Submit</Submit>
      </>,
      undefined,
      { errors: mockFormErrors, onSubmit },
    )

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

    const { asFragment } = renderWithForm(
      <>
        <TextAreaField clearable label="Test" name="test" required />
        <Submit>Submit</Submit>
      </>,
      undefined,
      { errors: mockFormErrors, onSubmit },
    )

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
