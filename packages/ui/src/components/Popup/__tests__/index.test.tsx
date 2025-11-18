import { screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme, shouldMatchSnapshotWithPortal } from '@utils/test'
import type { ComponentProps } from 'react'
import { describe, expect, test, vi } from 'vitest'
import { Popup } from '../../index'

describe('popup', () => {
  test('should render correctly', () =>
    shouldMatchSnapshotWithPortal(
      <Popup debounceDelay={0} text="test">
        Hover me
      </Popup>,
    ))

  test('should render correctly without text', () =>
    shouldMatchSnapshotWithPortal(<Popup debounceDelay={0}>Hover me</Popup>))

  test(`should display Popup on hover`, async () => {
    renderWithTheme(
      <Popup debounceDelay={0} id="test" text="test success!">
        <p data-testid="children">Hover me</p>
      </Popup>,
    )

    const input = screen.getByTestId('children')
    await userEvent.hover(input)

    const PopupPortal = screen.getByText('test success!')
    expect(PopupPortal).toBeVisible()
  })

  test(`should display Popup on hover with no animation`, async () => {
    renderWithTheme(
      <Popup debounceDelay={0} disableAnimation id="test" text="test success!">
        <p data-testid="children">Hover me</p>
      </Popup>,
    )

    const input = screen.getByTestId('children')
    await userEvent.hover(input)

    const PopupPortal = screen.getByText('test success!')
    expect(PopupPortal).toBeVisible()
  })

  test(`should display Popup on hover with maxHeight`, async () => {
    renderWithTheme(
      <Popup debounceDelay={0} id="test" maxHeight="200px" text="test success!">
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
      <Popup debounceDelay={0} id="test" text="test success!">
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
      <Popup debounceDelay={0} id="test" text="test success!">
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
      <Popup debounceDelay={0} id="test" text="test success!">
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
      <Popup debounceDelay={0} text="test success!">
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
      <Popup debounceDelay={0} maxWidth={100} text="test success!">
        <p data-testid="children">Hover me</p>
      </Popup>,
    )

    const input = screen.getByTestId('children')
    await userEvent.hover(input)

    const PopupPortal = screen.getByText('test success!')
    expect(PopupPortal).toBeVisible()
  })

  describe(`defined placement`, () => {
    ;[
      'top',
      'left',
      'right',
      'bottom',
      'auto',
      'auto-top',
      'auto-bottom',
      'auto-left',
      'auto-right',
    ].forEach(placement => {
      test(`should renders Popup with placement ${placement}`, async () => {
        renderWithTheme(
          <Popup
            debounceDelay={0}
            placement={placement as ComponentProps<typeof Popup>['placement']}
            text="test success!"
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
      <Popup debounceDelay={0} maxWidth={100} text="test success!">
        <p data-testid="children">Hover me</p>
      </Popup>,
    )

    await userEvent.keyboard('{Tab}')

    const PopupPortal = screen.getByText('test success!')
    expect(PopupPortal).toBeVisible()

    await userEvent.keyboard('{Escape}')
    await waitFor(() => {
      expect(PopupPortal).not.toBeVisible()
    })
  })

  test(`should verify trap focus`, async () => {
    renderWithTheme(
      <Popup debounceDelay={0} maxWidth={100} text="test success!">
        <button data-testid="1" type="button">
          Focus me
        </button>
        <button data-testid="2" type="button">
          Focus me too
        </button>
      </Popup>,
    )

    await userEvent.keyboard('{Tab}')

    const PopupPortal = screen.getByText('test success!')
    expect(PopupPortal).toBeVisible()

    await userEvent.keyboard('{Tab}')
    await userEvent.keyboard('{Tab}')
    const secondButton = screen.getByTestId('2')
    expect(secondButton).toHaveFocus()

    await userEvent.keyboard('{Escape}')
    await waitFor(() => {
      expect(PopupPortal).not.toBeVisible()
    })
  })

  test(`should handle unmount correctly`, async () => {
    const onClose = vi.fn()
    const { unmount } = renderWithTheme(
      <Popup onClose={onClose} text="test unmount!">
        <p data-testid="unmount-children">Hover me</p>
      </Popup>,
    )

    const input = screen.getByTestId('unmount-children')
    await userEvent.hover(input)

    await waitFor(
      () => {
        const PopupPortal = screen.getByText('test unmount!')
        expect(PopupPortal).toBeVisible()
      },
      { timeout: 300 },
    )

    await userEvent.unhover(input)
    unmount()
    expect(onClose).not.toHaveBeenCalled()
  })
})
