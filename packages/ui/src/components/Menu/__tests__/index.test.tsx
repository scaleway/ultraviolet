import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import {
  renderWithTheme,
  shouldMatchEmotionSnapshot,
  shouldMatchEmotionSnapshotWithPortal,
} from '@utils/test'
import { afterAll, beforeEach, describe, expect, test, vi } from 'vitest'
import { Menu, arrowPlacements } from '..'

const mockOnClick = vi.fn()

describe('Menu', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterAll(() => {
    vi.restoreAllMocks()
  })

  test('renders with disclosure not a function', () =>
    shouldMatchEmotionSnapshotWithPortal(
      <Menu
        id="menu"
        disclosure={<button type="button">Menu is visible</button>}
      >
        <Menu.Item>Menu.Item should not be visible in test</Menu.Item>
      </Menu>,
    ))
  test('renders with visible=false', () =>
    shouldMatchEmotionSnapshotWithPortal(
      <Menu
        id="menu"
        disclosure={() => <button type="button">Menu is visible</button>}
      >
        <Menu.Item>Menu.Item should not be visible in test</Menu.Item>
      </Menu>,
    ))
  test(`renders with Menu.Item`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <Menu
        visible
        id="menu"
        disclosure={() => <button type="button">Menu</button>}
      >
        <Menu.Item>Menu.Item</Menu.Item>
      </Menu>,
    ))

  test(`renders with Menu.ItemLink`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <Menu
        visible
        id="menu-1"
        disclosure={() => <button type="button">Menu</button>}
      >
        <Menu.Item href="/link">Menu.Item as Link</Menu.Item>
      </Menu>,
    ))

  test(`renders with Menu.ItemLink & Menu.Item disabled`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <Menu
        visible
        id="menu-1"
        disclosure={() => <button type="button">Menu</button>}
      >
        <Menu.Item disabled>Menu.Item disabled</Menu.Item>
        <Menu.Item href="/link" disabled>
          Menu.Item Link disabled
        </Menu.Item>
      </Menu>,
    ))

  test('disclosure function render onClick props is call', async () => {
    renderWithTheme(
      <Menu
        visible
        id="menu"
        disclosure={() => (
          <button type="button" onClick={mockOnClick}>
            Menu
          </button>
        )}
      >
        <Menu.Item href="/link">Menu.Item as Link</Menu.Item>
      </Menu>,
    )

    const menuButton = screen.getByRole('button')
    await userEvent.click(menuButton)
    expect(mockOnClick).toBeCalledTimes(1)
  })

  test('disclosure Component render onClick props is call', async () => {
    renderWithTheme(
      <Menu
        visible
        id="menu"
        disclosure={() => (
          <button type="button" onClick={mockOnClick}>
            Menu
          </button>
        )}
      >
        <Menu.Item href="/link">Menu.Item as Link</Menu.Item>
      </Menu>,
    )

    const menuButton = screen.getByRole('button')
    await userEvent.click(menuButton)
    expect(mockOnClick).toBeCalledTimes(1)
  })

  describe('placement', () => {
    test.each(arrowPlacements)('renders "%s"', placement =>
      shouldMatchEmotionSnapshot(
        <Menu
          visible
          id={placement}
          placement={placement}
          disclosure={() => <button type="button">Menu</button>}
        >
          <Menu.Item>{placement}</Menu.Item>
        </Menu>,
      ),
    )
  })

  describe('Menu.Item', () => {
    test(`render with default props`, () =>
      shouldMatchEmotionSnapshot(<Menu.Item>Default Props</Menu.Item>))

    test(`render with sentiment danger`, () =>
      shouldMatchEmotionSnapshot(
        <Menu.Item sentiment="danger">Danger</Menu.Item>,
      ))

    test(`render with disabled props`, () =>
      shouldMatchEmotionSnapshot(
        <Menu.Item disabled>Disabled Props</Menu.Item>,
      ))
    test(`render with borderless props`, () =>
      shouldMatchEmotionSnapshot(
        <Menu.Item borderless>Borderless Props</Menu.Item>,
      ))
  })
})
