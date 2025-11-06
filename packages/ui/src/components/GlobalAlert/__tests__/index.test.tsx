import { screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme, shouldMatchSnapshot } from '@utils/test'
import { describe, expect, test } from 'vitest'
import { GlobalAlert } from '..'

describe('globalAlert', () => {
  test('renders correctly with default values', () =>
    shouldMatchSnapshot(<GlobalAlert>Simple GlobalAlert</GlobalAlert>))

  test('renders correctly with children as component', () =>
    shouldMatchSnapshot(<GlobalAlert>Sample GlobalAlert</GlobalAlert>))

  test('renders correctly with buttonText and onClickButton', () =>
    shouldMatchSnapshot(
      <GlobalAlert buttonText="Button" onClickButton={() => 'ok'}>
        Sample GlobalAlert
      </GlobalAlert>,
    ))

  test('renders correctly with closable and onClose', () =>
    shouldMatchSnapshot(
      <GlobalAlert closable onClose={() => 'ok'}>
        Sample GlobalAlert
      </GlobalAlert>,
    ))

  describe(`renders correctly with all variants`, () => {
    ;(['info', 'danger', 'promotional'] as const).forEach(variant => {
      test(`renders correctly variant ${variant}`, () =>
        shouldMatchSnapshot(
          <GlobalAlert variant={variant}>Sample GlobalAlert</GlobalAlert>,
        ))
    })
  })

  test(`should render GlobalAlert and then close it`, async () => {
    renderWithTheme(
      <GlobalAlert data-testid="GlobalAlert" onClose={() => 'ok'}>
        Sample GlobalAlert
      </GlobalAlert>,
    )

    const Alert = screen.getByTestId('GlobalAlert')
    expect(Alert).toBeVisible()

    const closeButton = screen.getByRole('button')
    await userEvent.click(closeButton)

    await waitFor(() => {
      expect(Alert).not.toBeVisible()
    })
  })

  test('renders correctly with link', () =>
    shouldMatchSnapshot(
      <GlobalAlert buttonText="button">
        This is a&nbsp;
        <GlobalAlert.Link href="scaleway.com">Global Alert</GlobalAlert.Link>
        &nbsp; link
      </GlobalAlert>,
    ))
})
