import { describe, expect, test } from '@jest/globals'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ComponentProps } from 'react'
import {
  renderWithTheme,
  shouldMatchEmotionSnapshotWithPortal,
} from '../../../../../.jest/helpers'
import { Popup } from '../../index'

describe('Popup', () => {
  test('should render correctly', () =>
    shouldMatchEmotionSnapshotWithPortal(<Popup text="test">Hover me</Popup>))

  test('should render correctly without text', () =>
    shouldMatchEmotionSnapshotWithPortal(<Popup>Hover me</Popup>))

  test(`should display Popup on hover`, async () => {
    renderWithTheme(
      <Popup id="test" text="test success!">
        <p data-testid="children">Hover me</p>
      </Popup>,
    )

    const input = screen.getByTestId('children')
    await userEvent.hover(input)

    const PopupPortal = screen.getByText('test success!')
    expect(PopupPortal).toBeVisible()
  })

  test(`should display Popup on hover with function children`, async () => {
    renderWithTheme(
      <Popup id="test" text="test success!">
        {props => (
          <p {...props} data-testid="children">
            Hover me
          </p>
        )}
      </Popup>,
    )

    const input = screen.getByTestId('children')
    await userEvent.hover(input)

    const PopupPortal = screen.getByText('test success!')
    expect(PopupPortal).toBeVisible()
  })

  test(`should display Popup on hover and hide when exit`, async () => {
    renderWithTheme(
      <Popup id="test" text="test success!">
        <p data-testid="children">Hover me</p>
      </Popup>,
    )

    const input = screen.getByTestId('children')
    await userEvent.hover(input)

    const PopupPortal = screen.getByText('test success!')
    expect(PopupPortal).toBeVisible()
    await userEvent.unhover(input)

    await waitFor(() => {
      expect(PopupPortal).not.toBeVisible()
    })
  })

  test(`should display Popup on hover and hide when exit and hover back before animation ends`, async () => {
    renderWithTheme(
      <Popup id="test" text="test success!">
        <p data-testid="children">Hover me</p>
      </Popup>,
    )

    const input = screen.getByTestId('children')
    await userEvent.hover(input)

    const PopupPortal = screen.getByText('test success!')
    expect(PopupPortal).toBeVisible()
    await userEvent.unhover(input)
    await userEvent.hover(input)
    expect(PopupPortal).toBeVisible()
  })

  test(`should create Popup with random id`, async () => {
    renderWithTheme(
      <Popup text="test success!">
        <p data-testid="children">Hover me</p>
      </Popup>,
    )

    const input = screen.getByTestId('children')
    await userEvent.hover(input)

    const PopupPortal = screen.getByText('test success!')
    expect(PopupPortal).toBeVisible()
  })

  test(`should renders Popup with maxWidth`, async () => {
    renderWithTheme(
      <Popup text="test success!" maxWidth={100}>
        <p data-testid="children">Hover me</p>
      </Popup>,
    )

    const input = screen.getByTestId('children')
    await userEvent.hover(input)

    const PopupPortal = screen.getByText('test success!')
    expect(PopupPortal).toBeVisible()
  })

  describe(`defined placement`, () => {
    ;['top', 'left', 'right', 'bottom'].forEach(placement => {
      test(`should renders Popup with placement ${placement}`, async () => {
        renderWithTheme(
          <Popup
            text="test success!"
            placement={placement as ComponentProps<typeof Popup>['placement']}
          >
            <p data-testid="children">Hover me</p>
          </Popup>,
        )

        const children = screen.getByTestId('children')
        await userEvent.hover(children)

        const PopupPortal = screen.getByText('test success!')
        expect(PopupPortal).toBeVisible()
      })
    })
  })

  test(`should verify accessibility`, async () => {
    renderWithTheme(
      <Popup text="test success!" maxWidth={100}>
        <p data-testid="children">Hover me</p>
      </Popup>,
    )

    await userEvent.keyboard('{Tab}')

    const PopupPortal = screen.getByText('test success!')
    expect(PopupPortal).toBeVisible()

    await userEvent.keyboard('{Escape}')
    expect(PopupPortal).not.toBeVisible()
  })
})
