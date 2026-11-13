import { screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme } from '@utils/test'
import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { Menu } from '..'

const disclosure = <button type="button">Menu</button>

describe('menu', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterAll(() => {
    vi.restoreAllMocks()
  })

  it('renders with disclosure not a function', () => {
    const { asFragment } = renderWithTheme(
      <Menu disclosure={disclosure}>
        <Menu.Item>Menu.Item should not be visible in test</Menu.Item>
      </Menu>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders with visible=false', () => {
    const { asFragment } = renderWithTheme(
      <Menu disclosure={() => disclosure}>
        <Menu.Item>Menu.Item should not be visible in test</Menu.Item>
      </Menu>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('closes nested menus when Tab moves focus out', async () => {
    renderWithTheme(
      <>
        <Menu disclosure={() => disclosure}>
          <Menu disclosure={<Menu.Item>Submenu</Menu.Item>} placement="right" triggerMethod="click">
            <Menu.Item>Nested item</Menu.Item>
          </Menu>
        </Menu>
        <button type="button">Next</button>
      </>,
    )

    await userEvent.click(screen.getByRole('button', { name: 'Menu' }))
    await userEvent.click(screen.getByRole('menuitem', { name: 'Submenu' }))
    await waitFor(() => expect(screen.getByRole('menuitem', { name: 'Nested item' })).toHaveFocus())

    await userEvent.tab()

    expect(screen.getByRole('button', { name: 'Next' })).toHaveFocus()
    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument())
  })

  it('closes on focus out when there are no nested menus', async () => {
    renderWithTheme(
      <>
        <Menu disclosure={() => disclosure}>
          <Menu.Item>Menu item</Menu.Item>
        </Menu>
        <button type="button">Outside</button>
      </>,
    )

    await userEvent.click(screen.getByRole('button', { name: 'Menu' }))
    await waitFor(() => expect(screen.getByRole('menuitem', { name: 'Menu item' })).toHaveFocus())

    screen.getByRole('button', { name: 'Outside' }).focus()

    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument())
  })

  it('keeps open on focus out when there are nested menus', async () => {
    renderWithTheme(
      <>
        <Menu disclosure={() => disclosure}>
          <Menu disclosure={<Menu.Item>Submenu</Menu.Item>} triggerMethod="click">
            <Menu.Item>Nested item</Menu.Item>
          </Menu>
        </Menu>
        <button type="button">Outside</button>
      </>,
    )

    await userEvent.click(screen.getByRole('button', { name: 'Menu' }))
    await waitFor(() => expect(screen.getByRole('menuitem', { name: 'Submenu' })).toBeVisible())

    screen.getByRole('button', { name: 'Outside' }).focus()

    expect(screen.getByRole('menu')).toBeVisible()
  })

  it('renders with Menu.Item', () => {
    const { asFragment } = renderWithTheme(
      <Menu disclosure={() => disclosure} visible>
        <Menu.Item>Menu.Item</Menu.Item>
      </Menu>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders with Menu.Group', () => {
    const { asFragment } = renderWithTheme(
      <Menu disclosure={() => disclosure} visible>
        <Menu.Group label="Group">
          <Menu.Item>Menu.Item</Menu.Item>
        </Menu.Group>
      </Menu>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders with Menu.Group and labelDescription', () => {
    const { asFragment } = renderWithTheme(
      <Menu disclosure={() => disclosure} visible>
        <Menu.Group label="Group" labelDescription="This is a description">
          <Menu.Item>Menu.Item</Menu.Item>
        </Menu.Group>
      </Menu>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders with Menu.ItemLink', () => {
    const { asFragment } = renderWithTheme(
      <Menu disclosure={() => disclosure} visible>
        <Menu.Item href="/link">Menu.Item as Link</Menu.Item>
      </Menu>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it(`renders with triggerMethod "hover"`, async () => {
    renderWithTheme(
      <Menu disclosure={() => disclosure} triggerMethod="hover">
        <Menu.Item href="/link">Menu.Item as Link</Menu.Item>
      </Menu>,
    )

    const disclosureMenu = screen.getByRole('button', { name: 'Menu' })
    await userEvent.hover(disclosureMenu)
    await waitFor(() => expect(screen.getByRole('menu')).toBeVisible())

    const menu = screen.getByRole('menu')
    await waitFor(() => expect(menu).toBeVisible())

    const menuItem = screen.getByRole<HTMLLinkElement>('menuitem')
    await userEvent.hover(menuItem)
    expect(menu).toBeVisible()

    await userEvent.unhover(menuItem)
    await userEvent.unhover(menu)

    await waitFor(() => expect(menu).not.toBeVisible())
  })

  it('renders with Menu.ItemLink & Menu.Item disabled', () => {
    const { asFragment } = renderWithTheme(
      <Menu disclosure={() => disclosure} visible>
        <Menu.Item disabled>Menu.Item disabled</Menu.Item>
        <Menu.Item disabled href="/link">
          Menu.Item Link disabled
        </Menu.Item>
      </Menu>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('disclosure Component render with function disclosure', async () => {
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

  it('disclosure Component render with function children', async () => {
    renderWithTheme(
      <Menu disclosure={() => disclosure} id="menu">
        {({ toggle }) => <Menu.Item onClick={toggle}>Menu.Item as Button with toggle</Menu.Item>}
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

  it('should hideOnClickItem', async () => {
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

  it('should search on simple childs', async () => {
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
    expect(items).toHaveLength(1)
    expect(items[0]).toHaveTextContent('Disk')
  })

  it('should search on simple complex childs', async () => {
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
    expect(items).toHaveLength(1)
    expect(items[0]).toHaveTextContent('Disk')
  })

  it('renders with footer', () => {
    const { asFragment } = renderWithTheme(
      <Menu disclosure={() => disclosure} footer="Footer" visible>
        <Menu.Item>Not footer</Menu.Item>
      </Menu>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders with rightComponent', async () => {
    const onClick = vi.fn()
    const onClickMenu = vi.fn()
    const { asFragment } = renderWithTheme(
      <Menu disclosure={() => disclosure} footer="Footer" hideOnClickItem visible>
        <Menu.Item
          onClick={onClickMenu}
          rightComponent={
            <button onClick={onClick} type="button">
              click me
            </button>
          }
        >
          Not footer
        </Menu.Item>
      </Menu>,
    )

    const button = screen.getByRole('button', {
      name: 'click me',
    })
    await userEvent.click(button)
    expect(onClick).toHaveBeenCalledOnce()
    expect(onClickMenu).toHaveBeenCalledTimes(0)
    expect(button).toBeVisible()

    await userEvent.click(screen.getByText('Not footer'))
    expect(onClick).toHaveBeenCalledOnce()
    expect(onClickMenu).toHaveBeenCalledOnce()

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders with rightComponent and link item', async () => {
    const onClick = vi.fn()
    const onClickMenu = vi.fn()
    const { asFragment } = renderWithTheme(
      <Menu disclosure={() => disclosure} footer="Footer" hideOnClickItem visible>
        <Menu.Item
          href="exemple.com"
          onClick={onClickMenu}
          rightComponent={
            <button onClick={onClick} type="button">
              click me
            </button>
          }
        >
          Not footer
        </Menu.Item>
      </Menu>,
    )

    const button = screen.getByRole('button', {
      name: 'click me',
    })
    await userEvent.click(button)
    expect(onClick).toHaveBeenCalledOnce()
    expect(onClickMenu).toHaveBeenCalledTimes(0)
    expect(button).toBeVisible()

    await userEvent.click(screen.getByText('Not footer'))
    expect(onClick).toHaveBeenCalledOnce()
    expect(onClickMenu).toHaveBeenCalledOnce()

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders with rightComponent and link item (keyboard navigation)', async () => {
    const onKeyDown = vi.fn()
    const onClickMenu = vi.fn()
    const { asFragment } = renderWithTheme(
      <Menu disclosure={() => disclosure} footer="Footer" hideOnClickItem visible>
        <Menu.Item
          href="exemple.com"
          onClick={onClickMenu}
          rightComponent={
            <button onKeyDown={onKeyDown} type="button">
              click me
            </button>
          }
        >
          Not footer
        </Menu.Item>
      </Menu>,
    )

    const button = screen.getByRole('button', {
      name: 'click me',
    })
    await waitFor(() => expect(screen.getByRole('menuitem', { name: /Not footer/ })).toHaveFocus())
    await userEvent.click(button)
    expect(button).toHaveFocus()
    await userEvent.keyboard('[Space]')
    expect(onKeyDown).toHaveBeenCalledOnce()
    expect(onClickMenu).toHaveBeenCalledTimes(0)
    expect(button).toBeVisible()

    await userEvent.keyboard('[Space]')

    await userEvent.click(screen.getByText('Not footer'))
    expect(onClickMenu).toHaveBeenCalledOnce()

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders with rightComponent  (keyboard navigation)', async () => {
    const onKeyDown = vi.fn()
    const onClickMenu = vi.fn()
    const { asFragment } = renderWithTheme(
      <Menu disclosure={() => disclosure} footer="Footer" hideOnClickItem visible>
        <Menu.Item
          onClick={onClickMenu}
          rightComponent={
            <button onKeyDown={onKeyDown} type="button">
              click me
            </button>
          }
        >
          Not footer
        </Menu.Item>
      </Menu>,
    )

    const button = screen.getByRole('button', {
      name: 'click me',
    })
    await waitFor(() => expect(screen.getByRole('menuitem', { name: /Not footer/ })).toHaveFocus())
    await userEvent.click(button)
    expect(button).toHaveFocus()
    await userEvent.keyboard('[Enter]')
    expect(onKeyDown).toHaveBeenCalledOnce()
    expect(onClickMenu).toHaveBeenCalledTimes(0)
    expect(button).toBeVisible()

    await userEvent.keyboard('[Space]')

    await userEvent.click(screen.getByText('Not footer'))
    expect(onClickMenu).toHaveBeenCalledOnce()

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders nested', async () => {
    const { asFragment } = renderWithTheme(
      <Menu disclosure={() => disclosure} searchable>
        <Menu.Item borderless>Power on</Menu.Item>
        <Menu disclosure={<Menu.Item>SubMenu click</Menu.Item>} placement="right" triggerMethod="click">
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

    const nestedElement = screen.getByRole('menuitem', { name: 'SubMenu click' })
    await userEvent.click(nestedElement)
    expect(screen.getByRole('menuitem', { name: 'hi!' })).toBeVisible()

    expect(asFragment()).toMatchSnapshot()
  })

  it('parent menu should stay visible after opening nested menu', async () => {
    renderWithTheme(
      <Menu disclosure={() => disclosure}>
        <Menu.Item>Item 1</Menu.Item>
        <Menu disclosure={<Menu.Item>SubMenu</Menu.Item>} placement="right" triggerMethod="click">
          <Menu.Item>Nested Item</Menu.Item>
        </Menu>
        <Menu.Item>Item 2</Menu.Item>
      </Menu>,
    )

    const menuButton = screen.getByRole<HTMLButtonElement>('button')

    await userEvent.click(menuButton)
    const parentDialog = screen.getByRole('dialog')

    await waitFor(() => {
      expect(parentDialog).toBeVisible()
    })

    const nestedElement = screen.getByRole('menuitem', { name: 'SubMenu' })
    await userEvent.click(nestedElement)

    expect(parentDialog).toBeVisible()
    expect(screen.getByRole('menuitem', { name: 'Item 1' })).toBeVisible()
    expect(screen.getByRole('menuitem', { name: 'Item 2' })).toBeVisible()
    expect(screen.getByRole('menuitem', { name: 'Nested Item' })).toBeVisible()
  })

  it('can navigate with arrow keys', async () => {
    const { asFragment } = renderWithTheme(
      <Menu disclosure={() => disclosure}>
        <Menu.Item borderless>Power on</Menu.Item>
        <Menu disclosure={<Menu.Item>SubMenu click</Menu.Item>} placement="right" triggerMethod="click">
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

    const firstItem = screen.getByRole('menuitem', { name: 'Power on' })
    await waitFor(() => expect(firstItem).toHaveFocus())

    const nestedElement = screen.getByRole('menuitem', { name: 'SubMenu click' })
    await userEvent.keyboard('[ArrowDown]')
    expect(nestedElement).toHaveFocus()
    await userEvent.keyboard('[ArrowUp][ArrowUp]')
    expect(nestedElement).toHaveFocus()
    await userEvent.keyboard('[ArrowRight]')

    const nestedMenu = screen.getByRole('menuitem', { name: 'hi!' })
    await waitFor(() => expect(nestedMenu).toHaveFocus())
    await userEvent.keyboard('[ArrowLeft]')
    expect(asFragment()).toMatchSnapshot()
  })

  describe('placement', () => {
    it('renders top', () => {
      const { asFragment } = renderWithTheme(
        <Menu disclosure={() => disclosure} placement="top" visible>
          <Menu.Item>top</Menu.Item>
        </Menu>,
      )

      expect(asFragment()).toMatchSnapshot()
    })

    it('renders bottom', () => {
      const { asFragment } = renderWithTheme(
        <Menu disclosure={() => disclosure} placement="bottom" visible>
          <Menu.Item>bottom</Menu.Item>
        </Menu>,
      )

      expect(asFragment()).toMatchSnapshot()
    })

    it('renders left', () => {
      const { asFragment } = renderWithTheme(
        <Menu disclosure={() => disclosure} placement="left" visible>
          <Menu.Item>left</Menu.Item>
        </Menu>,
      )

      expect(asFragment()).toMatchSnapshot()
    })

    it('renders right', () => {
      const { asFragment } = renderWithTheme(
        <Menu disclosure={() => disclosure} placement="right" visible>
          <Menu.Item>right</Menu.Item>
        </Menu>,
      )

      expect(asFragment()).toMatchSnapshot()
    })
  })

  describe('menu.Item', () => {
    it('render with default props', () => {
      const { asFragment } = renderWithTheme(
        <Menu disclosure={disclosure} visible>
          <Menu.Item>Default Props</Menu.Item>
        </Menu>,
      )

      expect(asFragment()).toMatchSnapshot()
    })

    it('render with sentiment danger', () => {
      const { asFragment } = renderWithTheme(
        <Menu disclosure={disclosure} visible>
          <Menu.Item sentiment="danger">Danger</Menu.Item>
        </Menu>,
      )

      expect(asFragment()).toMatchSnapshot()
    })

    it('render with disabled props', () => {
      const { asFragment } = renderWithTheme(
        <Menu disclosure={disclosure} visible>
          <Menu.Item disabled>Disabled Props</Menu.Item>
        </Menu>,
      )

      expect(asFragment()).toMatchSnapshot()
    })

    it('render with borderless props', () => {
      const { asFragment } = renderWithTheme(
        <Menu disclosure={disclosure} visible>
          <Menu.Item borderless>Borderless Props</Menu.Item>
        </Menu>,
      )

      expect(asFragment()).toMatchSnapshot()
    })

    it('render with active props', () => {
      const { asFragment } = renderWithTheme(
        <Menu disclosure={disclosure} visible>
          <Menu.Item active>Active Props</Menu.Item>
        </Menu>,
      )

      expect(asFragment()).toMatchSnapshot()
    })

    it('should hideOnClick for specific item', async () => {
      renderWithTheme(
        <Menu disclosure={() => disclosure} id="menu">
          <Menu.Item hideOnClick>Should Hide</Menu.Item>
          <Menu.Item>Should not Hide</Menu.Item>
        </Menu>,
      )
      const menuButton = screen.getByRole<HTMLButtonElement>('button')
      // Open Menu
      await userEvent.click(menuButton)
      const menu = screen.getByRole('menu')

      await waitFor(() => {
        expect(menu).toBeVisible()
      })

      // Click item that should NOT close the menu
      const itemNoHide = screen.getByRole<HTMLLinkElement>('menuitem', {
        name: 'Should not Hide',
      })
      await userEvent.click(itemNoHide)
      await waitFor(() => {
        expect(menu).toBeVisible()
      })

      // Click item that SHOULD close the menu
      const itemHide = screen.getByRole<HTMLLinkElement>('menuitem', {
        name: 'Should Hide',
      })
      await userEvent.click(itemHide)
      await waitFor(() => {
        expect(menu).not.toBeVisible()
      })
    })
  })
})
