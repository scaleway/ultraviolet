import { screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import {
  renderWithTheme,
  shouldMatchEmotionSnapshot,
  shouldMatchEmotionSnapshotWithPortal,
} from '@utils/test'
import { afterAll, beforeEach, describe, expect, test, vi } from 'vitest'
import { MenuV2 } from '..'

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
      <MenuV2 disclosure={disclosure}>
        <MenuV2.Item>Menu.Item should not be visible in test</MenuV2.Item>
      </MenuV2>,
    ))
  test('renders with visible=false', () =>
    shouldMatchEmotionSnapshotWithPortal(
      <MenuV2 disclosure={disclosure}>
        <MenuV2.Item>Menu.Item should not be visible in test</MenuV2.Item>
      </MenuV2>,
    ))
  test(`renders with Menu.Item`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <MenuV2 visible disclosure={disclosure}>
        <MenuV2.Item>Menu.Item</MenuV2.Item>
      </MenuV2>,
    ))

  test(`renders with Menu.Group`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <MenuV2 visible disclosure={disclosure}>
        <MenuV2.Group label="Group">
          <MenuV2.Item>Menu.Item</MenuV2.Item>
        </MenuV2.Group>
      </MenuV2>,
    ))

  test(`renders with Menu.Group and labelDescription`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <MenuV2 visible disclosure={disclosure}>
        <MenuV2.Group label="Group" labelDescription="This is a description">
          <MenuV2.Item>Menu.Item</MenuV2.Item>
        </MenuV2.Group>
      </MenuV2>,
    ))

  test(`renders with Menu.ItemLink`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <MenuV2 visible disclosure={disclosure}>
        <MenuV2.Item href="/link">Menu.Item as Link</MenuV2.Item>
      </MenuV2>,
    ))

  test(`renders with Menu.ItemLink & Menu.Item disabled`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <MenuV2 visible disclosure={disclosure}>
        <MenuV2.Item disabled>Menu.Item disabled</MenuV2.Item>
        <MenuV2.Item href="/link" disabled>
          Menu.Item Link disabled
        </MenuV2.Item>
      </MenuV2>,
    ))

  test('disclosure Component render with function disclosure', async () => {
    renderWithTheme(
      <MenuV2 id="menu" disclosure={() => disclosure}>
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
      <MenuV2 id="menu" disclosure={() => disclosure}>
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
      <MenuV2 id="menu" hideOnClickItem disclosure={disclosure}>
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
      <MenuV2 id="menu" searchable disclosure={() => disclosure}>
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

  test('should search on simple complex childs', async () => {
    const { asFragment } = renderWithTheme(
      <MenuV2 id="menu" searchable disclosure={() => disclosure}>
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

  test('should search and find item using searchText', async () => {
    const { asFragment } = renderWithTheme(
      <MenuV2
        id="menu"
        searchable
        disclosure={() => <button type="button">Menu</button>}
      >
        <MenuV2.Item searchText="Disk">
          <div>
            <div>Volume type</div>
          </div>
        </MenuV2.Item>
        <MenuV2.Item>
          <div>
            <div>Memory type</div>
          </div>
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
    expect(items[0]).toHaveTextContent('Volume type')
  })

  test('renders with footer', () =>
    shouldMatchEmotionSnapshot(
      <MenuV2 visible footer="Footer" disclosure={() => disclosure}>
        <MenuV2.Item>Not footer</MenuV2.Item>
      </MenuV2>,
    ))

  test('renders nested', async () => {
    const { asFragment } = renderWithTheme(
      <MenuV2 disclosure={() => disclosure} searchable>
        <MenuV2.Item borderless>Power on</MenuV2.Item>
        <MenuV2
          disclosure={<MenuV2.Item>SubMenu click</MenuV2.Item>}
          triggerMethod="click"
        >
          <MenuV2.Item>hi!</MenuV2.Item>
        </MenuV2>
      </MenuV2>,
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

  test('renders deep nested', async () => {
    shouldMatchEmotionSnapshot(
      <MenuV2 visible disclosure={() => disclosure} searchable>
        <MenuV2.Item borderless>Power on</MenuV2.Item>
        <MenuV2
          visible
          disclosure={<MenuV2.Item>SubMenu click</MenuV2.Item>}
          triggerMethod="click"
        >
          <MenuV2.Item>hi!</MenuV2.Item>
        </MenuV2>
        <MenuV2
          visible
          disclosure={<MenuV2.Item>SubMenu click</MenuV2.Item>}
          triggerMethod="click"
        >
          <MenuV2.Item>hi!</MenuV2.Item>
        </MenuV2>
        <MenuV2
          visible
          disclosure={<MenuV2.Item>SubMenu click</MenuV2.Item>}
          triggerMethod="click"
        >
          <MenuV2.Item>hi!</MenuV2.Item>
        </MenuV2>
        <MenuV2
          visible
          disclosure={<MenuV2.Item>SubMenu click</MenuV2.Item>}
          triggerMethod="click"
        >
          <MenuV2.Item>hi!</MenuV2.Item>
        </MenuV2>
      </MenuV2>,
    )
  })

  test('should search on nested elements', async () => {
    const { asFragment } = renderWithTheme(
      <MenuV2 id="menu" disclosure={() => disclosure} searchable>
        <MenuV2.Item borderless>Power on</MenuV2.Item>
        <MenuV2
          disclosure={<MenuV2.Item>SubMenu click</MenuV2.Item>}
          triggerMethod="click"
        >
          <MenuV2.Item>hi!</MenuV2.Item>
        </MenuV2>
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
    await userEvent.type(searchInput, 'hi!')

    const items = screen.getAllByRole<HTMLButtonElement>('menuitem')
    expect(items.length).toBe(1)
    expect(items[0]).toHaveTextContent('SubMenu click')
  })

  describe('placement', () => {
    test('renders top', () =>
      shouldMatchEmotionSnapshot(
        <MenuV2 visible placement="top" disclosure={() => disclosure}>
          <MenuV2.Item>top</MenuV2.Item>
        </MenuV2>,
      ))

    test('renders bottom', () =>
      shouldMatchEmotionSnapshot(
        <MenuV2 visible placement="bottom" disclosure={() => disclosure}>
          <MenuV2.Item>bottom</MenuV2.Item>
        </MenuV2>,
      ))

    test('renders left', () =>
      shouldMatchEmotionSnapshot(
        <MenuV2 visible placement="left" disclosure={() => disclosure}>
          <MenuV2.Item>left</MenuV2.Item>
        </MenuV2>,
      ))
    test('renders right', () =>
      shouldMatchEmotionSnapshot(
        <MenuV2 visible placement="right" disclosure={() => disclosure}>
          <MenuV2.Item>right</MenuV2.Item>
        </MenuV2>,
      ))
  })

  describe('sizes', () => {
    test('renders small', () =>
      shouldMatchEmotionSnapshot(
        <MenuV2 visible size="small" disclosure={() => disclosure}>
          <MenuV2.Item>small</MenuV2.Item>
        </MenuV2>,
      ))

    test('renders medium', () =>
      shouldMatchEmotionSnapshot(
        <MenuV2 visible size="medium" disclosure={() => disclosure}>
          <MenuV2.Item>medium</MenuV2.Item>
        </MenuV2>,
      ))

    test('renders large', () =>
      shouldMatchEmotionSnapshot(
        <MenuV2 visible size="large" disclosure={() => disclosure}>
          <MenuV2.Item>large</MenuV2.Item>
        </MenuV2>,
      ))
  })

  describe('Menu.Item', () => {
    test(`render with default props`, () =>
      shouldMatchEmotionSnapshot(
        <MenuV2 visible disclosure={disclosure}>
          <MenuV2.Item>Default Props</MenuV2.Item>
        </MenuV2>,
      ))

    test(`render with sentiment danger`, () =>
      shouldMatchEmotionSnapshot(
        <MenuV2 visible disclosure={disclosure}>
          <MenuV2.Item sentiment="danger">Danger</MenuV2.Item>
        </MenuV2>,
      ))

    test(`render with disabled props`, () =>
      shouldMatchEmotionSnapshot(
        <MenuV2 visible disclosure={disclosure}>
          <MenuV2.Item disabled>Disabled Props</MenuV2.Item>
        </MenuV2>,
      ))
    test(`render with borderless props`, () =>
      shouldMatchEmotionSnapshot(
        <MenuV2 visible disclosure={disclosure}>
          <MenuV2.Item borderless>Borderless Props</MenuV2.Item>
        </MenuV2>,
      ))
    test(`render with active props`, () =>
      shouldMatchEmotionSnapshot(
        <MenuV2 visible disclosure={disclosure}>
          <MenuV2.Item active>Active Props</MenuV2.Item>
        </MenuV2>,
      ))

    test(`raise error when not used in MenuV2`, () => {
      expect(() =>
        renderWithTheme(<MenuV2.Item>item</MenuV2.Item>),
      ).toThrowError('useMenu must be used in MenuProvider')
    })
  })
})
