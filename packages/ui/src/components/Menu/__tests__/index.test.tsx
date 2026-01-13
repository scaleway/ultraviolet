import { fireEvent, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import {
  renderWithTheme,
  shouldMatchSnapshot,
  shouldMatchSnapshotWithPortal,
} from '@utils/test'
import { afterAll, beforeEach, describe, expect, test, vi } from 'vitest'
import { Menu } from '..'

const disclosure = (
  <button data-testid="disclosure" type="button">
    Menu
  </button>
)

describe('menu', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterAll(() => {
    vi.restoreAllMocks()
  })

  test('renders with disclosure not a function', () =>
    shouldMatchSnapshotWithPortal(
      <Menu disclosure={disclosure}>
        <Menu.Item>Menu.Item should not be visible in test</Menu.Item>
      </Menu>,
    ))
  test('renders with visible=false', () =>
    shouldMatchSnapshotWithPortal(
      <Menu disclosure={() => disclosure}>
        <Menu.Item>Menu.Item should not be visible in test</Menu.Item>
      </Menu>,
    ))
  test('renders with Menu.Item', () =>
    shouldMatchSnapshotWithPortal(
      <Menu disclosure={() => disclosure} visible>
        <Menu.Item>Menu.Item</Menu.Item>
      </Menu>,
    ))

  test('renders with Menu.Group', () =>
    shouldMatchSnapshotWithPortal(
      <Menu disclosure={() => disclosure} visible>
        <Menu.Group label="Group">
          <Menu.Item>Menu.Item</Menu.Item>
        </Menu.Group>
      </Menu>,
    ))

  test('renders with Menu.Group and labelDescription', () =>
    shouldMatchSnapshotWithPortal(
      <Menu disclosure={() => disclosure} visible>
        <Menu.Group label="Group" labelDescription="This is a description">
          <Menu.Item>Menu.Item</Menu.Item>
        </Menu.Group>
      </Menu>,
    ))

  test('renders with Menu.ItemLink', () =>
    shouldMatchSnapshotWithPortal(
      <Menu disclosure={() => disclosure} visible>
        <Menu.Item href="/link">Menu.Item as Link</Menu.Item>
      </Menu>,
    ))

  test(`renders with triggerMethod "hover"`, async () => {
    renderWithTheme(
      <Menu disclosure={() => disclosure} triggerMethod="hover" visible>
        <Menu.Item href="/link">Menu.Item as Link</Menu.Item>
      </Menu>,
    )

    const disclosureMenu = screen.getByTestId('disclosure')
    fireEvent.mouseEnter(disclosureMenu)
    await waitFor(() => expect(screen.getByRole('menu')).toBeVisible())
    fireEvent.mouseLeave(disclosureMenu)

    await userEvent.hover(disclosureMenu)

    const menu = screen.getByRole('menu')
    await waitFor(() => expect(menu).toBeVisible())

    const menuItem = screen.getByRole<HTMLLinkElement>('menuitem')
    await userEvent.hover(menuItem)
    expect(menu).toBeVisible()

    fireEvent.mouseLeave(menu)
    await waitFor(() => expect(menu).not.toBeVisible())
  })

  test('renders with Menu.ItemLink & Menu.Item disabled', () =>
    shouldMatchSnapshotWithPortal(
      <Menu disclosure={() => disclosure} visible>
        <Menu.Item disabled>Menu.Item disabled</Menu.Item>
        <Menu.Item disabled href="/link">
          Menu.Item Link disabled
        </Menu.Item>
      </Menu>,
    ))

  test('disclosure Component render with function disclosure', async () => {
    renderWithTheme(
      <Menu disclosure={() => disclosure} id="menu">
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
      <Menu disclosure={() => disclosure} id="menu">
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
      <Menu disclosure={() => disclosure} hideOnClickItem id="menu">
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
      <Menu disclosure={() => disclosure} id="menu" searchable>
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
      <Menu disclosure={() => disclosure} id="menu" searchable>
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
    shouldMatchSnapshot(
      <Menu disclosure={() => disclosure} footer="Footer" visible>
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

  test('can navigate with arrow keys', async () => {
    const { asFragment } = renderWithTheme(
      <Menu disclosure={() => disclosure}>
        <Menu.Item borderless data-testid="item">
          Power on
        </Menu.Item>
        <Menu
          disclosure={
            <Menu.Item data-testid="nested-menu">SubMenu click</Menu.Item>
          }
          placement="right"
          triggerMethod="click"
        >
          <Menu.Item data-testid="nested-item">hi!</Menu.Item>
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

    const nestedElement = screen.getByTestId('nested-menu')
    await userEvent.keyboard('[ArrowDown][ArrowDown]')
    expect(nestedElement).toHaveFocus()
    await userEvent.keyboard('[ArrowUp][ArrowUp]')
    expect(nestedElement).toHaveFocus()
    await userEvent.keyboard('[ArrowRight]')

    const nestedMenu = screen.getByTestId('nested-item')
    expect(nestedMenu).toBeVisible()
    await userEvent.keyboard('[ArrowLeft]')
    expect(asFragment()).toMatchSnapshot()
  })

  describe('placement', () => {
    test('renders top', () =>
      shouldMatchSnapshot(
        <Menu disclosure={() => disclosure} placement="top" visible>
          <Menu.Item>top</Menu.Item>
        </Menu>,
      ))

    test('renders bottom', () =>
      shouldMatchSnapshot(
        <Menu disclosure={() => disclosure} placement="bottom" visible>
          <Menu.Item>bottom</Menu.Item>
        </Menu>,
      ))

    test('renders left', () =>
      shouldMatchSnapshot(
        <Menu disclosure={() => disclosure} placement="left" visible>
          <Menu.Item>left</Menu.Item>
        </Menu>,
      ))
    test('renders right', () =>
      shouldMatchSnapshot(
        <Menu disclosure={() => disclosure} placement="right" visible>
          <Menu.Item>right</Menu.Item>
        </Menu>,
      ))
  })

  describe('menu.Item', () => {
    test('render with default props', () =>
      shouldMatchSnapshot(
        <Menu disclosure={disclosure} visible>
          <Menu.Item>Default Props</Menu.Item>
        </Menu>,
      ))

    test('render with sentiment danger', () =>
      shouldMatchSnapshot(
        <Menu disclosure={disclosure} visible>
          <Menu.Item sentiment="danger">Danger</Menu.Item>
        </Menu>,
      ))

    test('render with disabled props', () =>
      shouldMatchSnapshot(
        <Menu disclosure={disclosure} visible>
          <Menu.Item disabled>Disabled Props</Menu.Item>
        </Menu>,
      ))
    test('render with borderless props', () =>
      shouldMatchSnapshot(
        <Menu disclosure={disclosure} visible>
          <Menu.Item borderless>Borderless Props</Menu.Item>
        </Menu>,
      ))
    test('render with active props', () =>
      shouldMatchSnapshot(
        <Menu disclosure={disclosure} visible>
          <Menu.Item active>Active Props</Menu.Item>
        </Menu>,
      ))
  })
})
