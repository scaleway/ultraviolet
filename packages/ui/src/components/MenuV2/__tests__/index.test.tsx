import { screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import {
  renderWithTheme,
  shouldMatchEmotionSnapshot,
  shouldMatchEmotionSnapshotWithPortal,
} from '@utils/test'
import type { ReactNode } from 'react'
import { afterAll, beforeEach, describe, expect, test, vi } from 'vitest'
import { MenuV2 } from '..'

describe('Menu', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterAll(() => {
    vi.restoreAllMocks()
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

  test(`renders with Menu.Group`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <MenuV2 visible disclosure={() => <button type="button">Menu</button>}>
        <MenuV2.Group label="Group">
          <MenuV2.Item>Menu.Item</MenuV2.Item>
        </MenuV2.Group>
      </MenuV2>,
    ))

  test(`renders with Menu.Group and labelDescription`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <MenuV2 visible disclosure={() => <button type="button">Menu</button>}>
        <MenuV2.Group label="Group" labelDescription="This is a description">
          <MenuV2.Item>Menu.Item</MenuV2.Item>
        </MenuV2.Group>
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

  test('disclosure Component render with function disclosure', async () => {
    renderWithTheme(
      <MenuV2 id="menu" disclosure={() => <button type="button">Menu</button>}>
        <MenuV2.Item href="/link">Menu.Item as Link</MenuV2.Item>
      </MenuV2>,
    )

    const menuButton = screen.getByRole('button')
    // Open and close
    await userEvent.click(menuButton)
    await userEvent.click(menuButton)
  })

  test('disclosure Component render with function children', async () => {
    renderWithTheme(
      <MenuV2 id="menu" disclosure={() => <button type="button">Menu</button>}>
        {({ toggle }) => (
          <MenuV2.Item onClick={toggle}>
            Menu.Item as Button with toggle
          </MenuV2.Item>
        )}
      </MenuV2>,
    )
    const menuButton = screen.getByRole<HTMLButtonElement>('button')
    // Open Menu
    await userEvent.click(menuButton)

    const menuLink = screen.getByRole<HTMLLinkElement>('menuitem')
    await userEvent.click(menuLink)

    await waitFor(() => {
      expect(menuLink).not.toBeVisible()
    })

    await waitFor(() => {
      expect(menuButton.getAttribute('aria-expanded')).toBe('false')
    })
  })

  test('should hideOnClickItem', async () => {
    renderWithTheme(
      <MenuV2
        id="menu"
        hideOnClickItem
        disclosure={() => <button type="button">Menu</button>}
      >
        <MenuV2.Item>Test</MenuV2.Item>
      </MenuV2>,
    )
    const menuButton = screen.getByRole<HTMLButtonElement>('button')
    // Open Menu
    await userEvent.click(menuButton)
    const dialog = screen.getByRole('dialog')

    await waitFor(() => {
      expect(dialog).toBeVisible()
    })

    const item = screen.getByRole<HTMLButtonElement>('menuitem')
    await userEvent.click(item)

    await waitFor(() => {
      expect(dialog).not.toBeVisible()
    })
  })

  test('should search on simple childs', async () => {
    const { asFragment } = renderWithTheme(
      <MenuV2
        id="menu"
        searchable
        disclosure={() => <button type="button">Menu</button>}
      >
        <MenuV2.Item>Disk</MenuV2.Item>
        <MenuV2.Item>Ram</MenuV2.Item>
      </MenuV2>,
    )
    const menuButton = screen.getByRole<HTMLButtonElement>('button')
    // Open Menu
    await userEvent.click(menuButton)
    const dialog = screen.getByRole('dialog')

    await waitFor(() => {
      expect(dialog).toBeVisible()
    })

    expect(asFragment()).toMatchSnapshot()

    const searchInput = screen.getByRole<HTMLInputElement>('textbox')
    await userEvent.type(searchInput, 'Disk')

    const items = screen.getAllByRole<HTMLButtonElement>('menuitem')
    expect(items.length).toBe(1)
    expect(items[0]).toHaveTextContent('Disk')
  })

  test('should search on simple and complex childs', async () => {
    // oxlint-disable-next-line consistent-function-scoping
    const ComplexChild = ({ content }: { content: ReactNode }) => content

    const { asFragment } = renderWithTheme(
      <MenuV2
        id="menu"
        searchable
        disclosure={() => <button type="button">Menu</button>}
      >
        <MenuV2.Item>
          <div>
            <div>Volume type:</div>
            <div>Disk</div>
          </div>
        </MenuV2.Item>
        <MenuV2.Item>
          <div>
            <div>Memory type:</div>
            <div>Ram</div>
          </div>
        </MenuV2.Item>
        <MenuV2.Item>
          <ComplexChild
            content={
              <div>
                <div>Storage type:</div>
                <div>SSD</div>
              </div>
            }
          />
        </MenuV2.Item>
      </MenuV2>,
    )
    const menuButton = screen.getByRole<HTMLButtonElement>('button')
    // Open Menu
    await userEvent.click(menuButton)
    const dialog = screen.getByRole('dialog')

    await waitFor(() => {
      expect(dialog).toBeVisible()
    })

    expect(asFragment()).toMatchSnapshot()

    const searchInput = screen.getByRole<HTMLInputElement>('textbox')
    await userEvent.type(searchInput, 'Disk')

    const items = screen.getAllByRole<HTMLButtonElement>('menuitem')
    expect(items.length).toBe(1)
    expect(items[0]).toHaveTextContent('Disk')
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

  describe('sizes', () => {
    test('renders small', () =>
      shouldMatchEmotionSnapshot(
        <MenuV2
          visible
          size="small"
          disclosure={() => <button type="button">Menu</button>}
        >
          <MenuV2.Item>small</MenuV2.Item>
        </MenuV2>,
      ))

    test('renders medium', () =>
      shouldMatchEmotionSnapshot(
        <MenuV2
          visible
          size="medium"
          disclosure={() => <button type="button">Menu</button>}
        >
          <MenuV2.Item>medium</MenuV2.Item>
        </MenuV2>,
      ))

    test('renders large', () =>
      shouldMatchEmotionSnapshot(
        <MenuV2
          visible
          size="large"
          disclosure={() => <button type="button">Menu</button>}
        >
          <MenuV2.Item>large</MenuV2.Item>
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
    test(`render with active props`, () =>
      shouldMatchEmotionSnapshot(
        <MenuV2.Item active>Borderless Props</MenuV2.Item>,
      ))
  })
})
