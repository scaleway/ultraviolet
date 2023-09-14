import {
  afterAll,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from '@jest/globals'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MenuV2 } from '..'
import {
  renderWithTheme,
  shouldMatchEmotionSnapshot,
  shouldMatchEmotionSnapshotWithPortal,
} from '../../../../.jest/helpers'

const mockOnClick = jest.fn()

describe('Menu', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  test('renders with disclosure not a function', () =>
    shouldMatchEmotionSnapshotWithPortal(
      <MenuV2 disclosure={<button type="button">Menu is visible</button>}>
        <MenuV2.Item>Menu.Item should not be visible in test</MenuV2.Item>
      </MenuV2>,
    ))
  test('renders with visible=false', () =>
    shouldMatchEmotionSnapshotWithPortal(
      <MenuV2 disclosure={() => <button type="button">Menu is visible</button>}>
        <MenuV2.Item>Menu.Item should not be visible in test</MenuV2.Item>
      </MenuV2>,
    ))
  test(`renders with Menu.Item`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <MenuV2 visible disclosure={() => <button type="button">Menu</button>}>
        <MenuV2.Item>Menu.Item</MenuV2.Item>
      </MenuV2>,
    ))

  test(`renders with Menu.ItemLink`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <MenuV2 visible disclosure={() => <button type="button">Menu</button>}>
        <MenuV2.Item href="/link">Menu.Item as Link</MenuV2.Item>
      </MenuV2>,
    ))

  test(`renders with Menu.ItemLink & Menu.Item disabled`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <MenuV2 visible disclosure={() => <button type="button">Menu</button>}>
        <MenuV2.Item disabled>Menu.Item disabled</MenuV2.Item>
        <MenuV2.Item href="/link" disabled>
          Menu.Item Link disabled
        </MenuV2.Item>
      </MenuV2>,
    ))

  test('disclosure function render onClick props is call', async () => {
    renderWithTheme(
      <MenuV2
        visible
        disclosure={() => (
          <button type="button" onClick={mockOnClick}>
            Menu
          </button>
        )}
      >
        <MenuV2.Item href="/link">Menu.Item as Link</MenuV2.Item>
      </MenuV2>,
    )

    const menuButton = screen.getByRole('button')
    await userEvent.click(menuButton)
    expect(mockOnClick).toBeCalledTimes(1)
  })

  test('disclosure Component render onClick props is call', async () => {
    renderWithTheme(
      <MenuV2
        visible
        disclosure={() => (
          <button type="button" onClick={mockOnClick}>
            Menu
          </button>
        )}
      >
        <MenuV2.Item href="/link">Menu.Item as Link</MenuV2.Item>
      </MenuV2>,
    )

    const menuButton = screen.getByRole('button')
    await userEvent.click(menuButton)
    expect(mockOnClick).toBeCalledTimes(1)
  })

  describe('placement', () => {
    test('renders top', () =>
      shouldMatchEmotionSnapshot(
        <MenuV2
          visible
          placement="top"
          disclosure={() => <button type="button">Menu</button>}
        >
          <MenuV2.Item>top</MenuV2.Item>
        </MenuV2>,
      ))

    test('renders bottom', () =>
      shouldMatchEmotionSnapshot(
        <MenuV2
          visible
          placement="bottom"
          disclosure={() => <button type="button">Menu</button>}
        >
          <MenuV2.Item>bottom</MenuV2.Item>
        </MenuV2>,
      ))

    test('renders left', () =>
      shouldMatchEmotionSnapshot(
        <MenuV2
          visible
          placement="left"
          disclosure={() => <button type="button">Menu</button>}
        >
          <MenuV2.Item>left</MenuV2.Item>
        </MenuV2>,
      ))
    test('renders right', () =>
      shouldMatchEmotionSnapshot(
        <MenuV2
          visible
          placement="right"
          disclosure={() => <button type="button">Menu</button>}
        >
          <MenuV2.Item>right</MenuV2.Item>
        </MenuV2>,
      ))
  })

  describe('Menu.Item', () => {
    test(`render with default props`, () =>
      shouldMatchEmotionSnapshot(<MenuV2.Item>Default Props</MenuV2.Item>))

    test(`render with sentiment danger`, () =>
      shouldMatchEmotionSnapshot(
        <MenuV2.Item sentiment="danger">Danger</MenuV2.Item>,
      ))

    test(`render with disabled props`, () =>
      shouldMatchEmotionSnapshot(
        <MenuV2.Item disabled>Disabled Props</MenuV2.Item>,
      ))
    test(`render with borderless props`, () =>
      shouldMatchEmotionSnapshot(
        <MenuV2.Item borderless>Borderless Props</MenuV2.Item>,
      ))
  })
})
