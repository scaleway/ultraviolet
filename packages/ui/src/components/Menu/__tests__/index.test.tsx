import { screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import {
  renderWithTheme,
  shouldMatchEmotionSnapshot,
  shouldMatchEmotionSnapshotWithPortal,
} from '@utils/test'
import { afterAll, beforeEach, describe, expect, test, vi } from 'vitest'
import { Menu } from '..'

const disclosure = <button type="button">Menu</button>

describe('Menu', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterAll(() => {
    vi.restoreAllMocks()
  })

  test('renders with disclosure not a function', () =>
    shouldMatchEmotionSnapshotWithPortal(
      <Menu disclosure={disclosure}>
        <Menu.Item>Menu.Item should not be visible in test</Menu.Item>
      </Menu>,
    ))
  test('renders with visible=false', () =>
    shouldMatchEmotionSnapshotWithPortal(
      <Menu disclosure={() => disclosure}>
        <Menu.Item>Menu.Item should not be visible in test</Menu.Item>
      </Menu>,
    ))
  test(`renders with Menu.Item`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <Menu visible disclosure={() => disclosure}>
        <Menu.Item>Menu.Item</Menu.Item>
      </Menu>,
    ))

  test(`renders with Menu.Group`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <Menu visible disclosure={() => disclosure}>
        <Menu.Group label="Group">
          <Menu.Item>Menu.Item</Menu.Item>
        </Menu.Group>
      </Menu>,
    ))

  test(`renders with Menu.Group and labelDescription`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <Menu visible disclosure={() => disclosure}>
        <Menu.Group label="Group" labelDescription="This is a description">
          <Menu.Item>Menu.Item</Menu.Item>
        </Menu.Group>
      </Menu>,
    ))

  test(`renders with Menu.ItemLink`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <Menu visible disclosure={() => disclosure}>
        <Menu.Item href="/link">Menu.Item as Link</Menu.Item>
      </Menu>,
    ))

  test(`renders with Menu.ItemLink & Menu.Item disabled`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <Menu visible disclosure={() => disclosure}>
        <Menu.Item disabled>Menu.Item disabled</Menu.Item>
        <Menu.Item href="/link" disabled>
          Menu.Item Link disabled
        </Menu.Item>
      </Menu>,
    ))

  test('disclosure Component render with function disclosure', async () => {
    renderWithTheme(
      <Menu id="menu" disclosure={() => disclosure}>
        <Menu.Item href="/link">Menu.Item as Link</Menu.Item>
      </Menu>,
    )

    const menuButton = screen.getByRole('button')
    // Open and close
    await userEvent.click(menuButton)
    await userEvent.click(menuButton)
  })

  test('disclosure Component render with function children', async () => {
    renderWithTheme(
      <Menu id="menu" disclosure={() => disclosure}>
        {({ toggle }) => (
          <Menu.Item onClick={toggle}>
            Menu.Item as Button with toggle
          </Menu.Item>
        )}
      </Menu>,
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
      <Menu id="menu" hideOnClickItem disclosure={() => disclosure}>
        <Menu.Item>Test</Menu.Item>
      </Menu>,
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
      <Menu id="menu" searchable disclosure={() => disclosure}>
        <Menu.Item>Disk</Menu.Item>
        <Menu.Item>Ram</Menu.Item>
      </Menu>,
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

  test('should search on simple complex childs', async () => {
    const { asFragment } = renderWithTheme(
      <Menu id="menu" searchable disclosure={() => disclosure}>
        <Menu.Item>
          <div>
            <div>Volume type:</div>
            <div>Disk</div>
          </div>
        </Menu.Item>
        <Menu.Item>
          <div>
            <div>Memory type:</div>
            <div>Ram</div>
          </div>
        </Menu.Item>
      </Menu>,
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
  test('renders with footer', () =>
    shouldMatchEmotionSnapshot(
      <Menu visible footer="Footer" disclosure={() => disclosure}>
        <Menu.Item>Not footer</Menu.Item>
      </Menu>,
    ))

  test('renders nested', async () => {
    const { asFragment } = renderWithTheme(
      <Menu disclosure={() => disclosure} searchable>
        <Menu.Item borderless>Power on</Menu.Item>
        <Menu
          disclosure={<Menu.Item>SubMenu click</Menu.Item>}
          placement="right"
          triggerMethod="click"
        >
          <Menu.Item>hi!</Menu.Item>
        </Menu>
      </Menu>,
    )

    const menuButton = screen.getByRole<HTMLButtonElement>('button')
    // Open Menu
    await userEvent.click(menuButton)
    const dialog = screen.getByRole('dialog')

    await waitFor(() => {
      expect(dialog).toBeVisible()
    })

    const nestedElement = screen.getByText('SubMenu click')
    await userEvent.click(nestedElement)
    expect(screen.getByText('hi!')).toBeVisible()

    expect(asFragment()).toMatchSnapshot()
  })

  describe('placement', () => {
    test('renders top', () =>
      shouldMatchEmotionSnapshot(
        <Menu visible placement="top" disclosure={() => disclosure}>
          <Menu.Item>top</Menu.Item>
        </Menu>,
      ))

    test('renders bottom', () =>
      shouldMatchEmotionSnapshot(
        <Menu visible placement="bottom" disclosure={() => disclosure}>
          <Menu.Item>bottom</Menu.Item>
        </Menu>,
      ))

    test('renders left', () =>
      shouldMatchEmotionSnapshot(
        <Menu visible placement="left" disclosure={() => disclosure}>
          <Menu.Item>left</Menu.Item>
        </Menu>,
      ))
    test('renders right', () =>
      shouldMatchEmotionSnapshot(
        <Menu visible placement="right" disclosure={() => disclosure}>
          <Menu.Item>right</Menu.Item>
        </Menu>,
      ))
  })

  describe('sizes', () => {
    test('renders small', () =>
      shouldMatchEmotionSnapshot(
        <Menu visible size="small" disclosure={() => disclosure}>
          <Menu.Item>small</Menu.Item>
        </Menu>,
      ))

    test('renders medium', () =>
      shouldMatchEmotionSnapshot(
        <Menu visible size="medium" disclosure={() => disclosure}>
          <Menu.Item>medium</Menu.Item>
        </Menu>,
      ))

    test('renders large', () =>
      shouldMatchEmotionSnapshot(
        <Menu visible size="large" disclosure={() => disclosure}>
          <Menu.Item>large</Menu.Item>
        </Menu>,
      ))
  })

  describe('Menu.Item', () => {
    test(`render with default props`, () =>
      shouldMatchEmotionSnapshot(
        <Menu visible disclosure={disclosure}>
          <Menu.Item>Default Props</Menu.Item>
        </Menu>,
      ))

    test(`render with sentiment danger`, () =>
      shouldMatchEmotionSnapshot(
        <Menu visible disclosure={disclosure}>
          <Menu.Item sentiment="danger">Danger</Menu.Item>
        </Menu>,
      ))

    test(`render with disabled props`, () =>
      shouldMatchEmotionSnapshot(
        <Menu visible disclosure={disclosure}>
          <Menu.Item disabled>Disabled Props</Menu.Item>
        </Menu>,
      ))
    test(`render with borderless props`, () =>
      shouldMatchEmotionSnapshot(
        <Menu visible disclosure={disclosure}>
          <Menu.Item borderless>Borderless Props</Menu.Item>
        </Menu>,
      ))
    test(`render with active props`, () =>
      shouldMatchEmotionSnapshot(
        <Menu visible disclosure={disclosure}>
          <Menu.Item active>Active Props</Menu.Item>
        </Menu>,
      ))
  })
})
