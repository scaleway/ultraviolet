import { screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { mockFormErrors, renderWithForm } from '@utils/test'
import { describe, expect, test } from 'vitest'
import { TextInputField } from '..'

describe('TextInputField', () => {
  test('should render correctly', () => {
    const { asFragment } = renderWithForm(<TextInputField name="test" />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly generated', () => {
    const { asFragment } = renderWithForm(
      <TextInputField name="test" generated />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly random', () => {
    const { asFragment } = renderWithForm(
      <TextInputField name="test" random="random" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly notice', () => {
    const { asFragment } = renderWithForm(
      <TextInputField name="test" notice="notice" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly required', () => {
    const { asFragment } = renderWithForm(
      <TextInputField name="test" required />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly id', () => {
    const { asFragment } = renderWithForm(
      <TextInputField name="test" id="id" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly disabled', () => {
    const { asFragment } = renderWithForm(
      <TextInputField name="test" disabled />,
    )

    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly with minLength', async () => {
    const { asFragment } = renderWithForm(
      <TextInputField name="test" minLength={13} />,
      {
        defaultValues: {
          test: null,
        },
      },
    )
    const input = screen.getByRole('textbox')
    await userEvent.type(input, 'test')
    input.blur()
    await waitFor(() => {
      expect(
        screen.getByText(
          mockFormErrors.minLength({
            label: 'test',
            minLength: 13,
            value: 'test',
          }),
        ),
      ).toBeVisible()
    })
    expect(asFragment()).toMatchSnapshot()
  })
})
