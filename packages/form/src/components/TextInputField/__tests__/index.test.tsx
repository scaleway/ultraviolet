import { screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { mockFormErrors, renderWithForm } from '@utils/test'
import { describe, expect, it, vi } from 'vitest'
import { TextInputField } from '..'
import { Submit } from '../..'

describe('textInputField', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithForm(<TextInputField label="Test" name="test" />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render correctly generated', async () => {
    const onSubmit = vi.fn()

    const { asFragment } = renderWithForm(
      <>
        <TextInputField clearable label="Test" name="test" required />
        <Submit>Submit</Submit>
      </>,
      { defaultValues: { test: null } },
      { errors: mockFormErrors, onSubmit },
    )

    await userEvent.click(screen.getByText('Submit'))
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(0)
    })
    const textInput = screen.getByLabelText('Test')
    await userEvent.type(textInput, 'This is an example')
    await userEvent.click(screen.getByText('Submit'))
    await waitFor(() => {
      expect(onSubmit.mock.calls[0][0]).toEqual({
        test: 'This is an example',
      })
    })
    expect(asFragment()).toMatchSnapshot()
  })
})
