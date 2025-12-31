import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithForm } from '@utils/test'
import { describe, expect, test } from 'vitest'
import { Submit, TextInputField } from '../..'

const alpha = /^[a-zA-Z]*$/

describe('submit', () => {
  test('renders correctly ', () => {
    const { asFragment } = renderWithForm(<Submit>Test</Submit>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('form is invalid', () => {
    const { asFragment } = renderWithForm(
      <>
        <TextInputField label="test" name="toto" regex={[alpha]} />
        <Submit>Test</Submit>
      </>,
      { defaultValues: { toto: '4' } },
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('form is submitting', async () => {
    const { asFragment } = renderWithForm(
      <Submit>Test</Submit>,
      {},
      {
        onSubmit: async () =>
          new Promise(resolve => {
            setTimeout(() => resolve(undefined), 500)
          }),
      },
    )
    await userEvent.click(
      // eslint-disable-next-line testing-library/no-node-access
      screen.getByText('Test').closest('button')!,
    )
    expect(
      // eslint-disable-next-line testing-library/no-node-access
      screen.getByText('Test').closest('button')!,
    ).toBeDisabled()

    expect(asFragment()).toMatchSnapshot()
  })
})
