import { screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { BaremetalCategoryIcon, UseCaseCategoryIcon } from '@ultraviolet/icons/category'
import { renderWithTheme } from '@utils/test'
import type { ComponentProps } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { Navigation, NavigationProvider } from '..'
import { NAVIGATION_MIN_WIDTH } from '../constants'

type BasicNavigationProps = Partial<ComponentProps<typeof NavigationProvider>>

const BasicNavigation = ({ initialWidth, pinnedFeature = true }: BasicNavigationProps) => (
  <NavigationProvider animation={false} pinnedFeature={pinnedFeature} initialWidth={initialWidth}>
    <Navigation logo={<p>Logo</p>}>
      <Navigation.PinnedItems />
      <Navigation.Separator />
      <Navigation.Group additionalData="additional data" label="Products">
        <Navigation.Item
          active
          categoryIcon={<UseCaseCategoryIcon variant="neutral" />}
          id="item1"
          label="Dashboard"
          noPinButton
        />
        <Navigation.Item categoryIcon={<UseCaseCategoryIcon />} id="item2" label="Servers" />
        <Navigation.Item categoryIcon={<UseCaseCategoryIcon />} id="item3" label="Not servers">
          <Navigation.Item id="item4" label="Thing" />
        </Navigation.Item>
      </Navigation.Group>
      {/* @ts-expect-error we try to test when no children is provided */}
      <Navigation.Group label="Empty Group" />
    </Navigation>
  </NavigationProvider>
)

const BasicNavigationNoExpand = ({ pinnedFeature = true }: BasicNavigationProps) => (
  <NavigationProvider animation pinnedFeature={pinnedFeature}>
    <Navigation logo={<p>Logo</p>}>
      <Navigation.PinnedItems />
      <Navigation.Group label="Products">
        <Navigation.Item id="compute" label="Compute" subLabel="All compute ressources">
          <Navigation.Item
            badgeSentiment="success"
            badgeText="new"
            href="http://scaleway.com"
            id="instance"
            label="Instance"
            target="_blank"
          />
          <Navigation.Item disabled id="elastic-metal" label="Elastic Metal" />
          <Navigation.Item id="advanced" label="Advanced" noExpand>
            <Navigation.Item id="kubernetes" label="Kubernetes" />
            <Navigation.Item id="openstack" label="OpenStack" />
          </Navigation.Item>
        </Navigation.Item>
      </Navigation.Group>
      <Navigation.Separator />
      {/* @ts-expect-error we try to test when no children is provided */}
      <Navigation.Group label="Empty Group" />
    </Navigation>
  </NavigationProvider>
)

const NavigationShowHide = ({
  pinnedFeature = true,
  onShowHide,
}: BasicNavigationProps & { onShowHide?: () => void }) => (
  <NavigationProvider animation={false} pinnedFeature={pinnedFeature} showHide="hide">
    <Navigation logo={<p>Logo</p>}>
      <Navigation.PinnedItems />
      <Navigation.Separator />
      <Navigation.Group label="Products">
        <Navigation.Item
          alwaysVisible
          categoryIcon={<UseCaseCategoryIcon variant="neutral" />}
          id="item1"
          label="Dashboard"
          noPinButton
        />
        <Navigation.Item categoryIcon={<UseCaseCategoryIcon />} id="item2" label="Servers" />
        <Navigation.ShowHide data-testid="show-hide" hideContent="hide" onShowHide={onShowHide} showContent="show" />
      </Navigation.Group>
      {/* @ts-expect-error we try to test when no children is provided */}
      <Navigation.Group label="Empty Group" />
    </Navigation>
  </NavigationProvider>
)

const NavigationNested = ({ pinnedFeature = true }: BasicNavigationProps & { onShowHide?: () => void }) => (
  <NavigationProvider animation={false} initialExpanded={false} pinnedFeature={pinnedFeature}>
    <Navigation logo={<p>Logo</p>}>
      <Navigation.Group label="Products">
        <Navigation.Item
          categoryIcon={<BaremetalCategoryIcon />}
          id="compute"
          label="Compute"
          subLabel="All compute ressources"
        >
          <Navigation.Item id="advanced" label="Advanced">
            <Navigation.Item id="kubernetes" label="Kubernetes" />
            <Navigation.Item id="openstack" label="OpenStack" />
          </Navigation.Item>
        </Navigation.Item>
      </Navigation.Group>
    </Navigation>
  </NavigationProvider>
)

describe('navigation', () => {
  it('render with basic content', () => {
    const { asFragment } = renderWithTheme(<BasicNavigation />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('render without pinnedFeature', () => {
    const { asFragment } = renderWithTheme(<BasicNavigation pinnedFeature={false} />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('render with basic content and no expand', () => {
    const { asFragment } = renderWithTheme(<BasicNavigationNoExpand />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('click on expand / collapse button', async () => {
    const { asFragment } = renderWithTheme(<BasicNavigation />)

    expect(asFragment()).toMatchSnapshot()

    const collapseButton = screen.getByRole('button', {
      name: 'Collapse sidebar',
    })
    await userEvent.click(collapseButton)
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Expand sidebar' })).toBeVisible()
    })
    expect(asFragment()).toMatchSnapshot()

    const itemMenu = screen.getByRole('button', { name: 'Servers' })
    await userEvent.hover(itemMenu)

    expect(screen.getByText('Thing')).toBeInTheDocument()

    const expandButton = screen.getByRole('button', {
      name: 'Expand sidebar',
    })
    await userEvent.click(expandButton)
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Collapse sidebar' })).toBeVisible()
    })
  })

  it('resize manually the navigation using slider', () => {
    const { asFragment } = renderWithTheme(<BasicNavigation />)

    const slider = screen.getByTestId('slider')

    const mouseEventExtend = new MouseEvent('mousedown', {
      clientX: 100,
    })

    slider.dispatchEvent(mouseEventExtend)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not accept an initialWidth smaller than the minimum accepted width', () => {
    renderWithTheme(<BasicNavigation initialWidth={100} />)

    expect(document.querySelector('nav > div')).toHaveAttribute(
      'style',
      expect.stringContaining(NAVIGATION_MIN_WIDTH.toString()),
    )
  })

  it('pin and unpin an item', async () => {
    const { asFragment } = renderWithTheme(<BasicNavigation />)

    expect(screen.getByText('You have no pinned items.')).toBeInTheDocument()

    // Wait for pin buttons to appear after hover
    // First, get all containers that might contain our item
    const allButtonsNav = await screen.findAllByRole('button')

    // Find the button that contains "Servers" text
    const firstServersButton = allButtonsNav.find(button => button.textContent?.includes('Servers'))

    // oxlint-disable-next-line vitest/no-conditional-in-test
    if (firstServersButton) {
      // Hover over the button to reveal the pin button
      await userEvent.hover(firstServersButton)
    }

    const pinButtons = screen.queryAllByRole('button', {
      name: 'pin',
    })
    expect(pinButtons.length).toBeGreaterThan(0)

    // The last button should be the one for "Servers" (since the first item has noPinButton)
    const pinButton = pinButtons.at(-1) as HTMLButtonElement

    await userEvent.click(pinButton)
    expect(asFragment()).toMatchSnapshot()

    const pinnedGroup = screen.getByTestId('pinned-group')
    await userEvent.click(pinnedGroup)

    expect(asFragment()).toMatchSnapshot()
    // close pinned group
    await userEvent.click(pinnedGroup)

    // Wait for unpin buttons to appear
    let unpinButton: HTMLButtonElement | undefined
    await waitFor(
      () => {
        const unpinButtons = screen.queryAllByRole('button', {
          name: 'unpin',
        }) satisfies HTMLButtonElement[]
        expect(unpinButtons.length).toBeGreaterThan(0)

        // The first button should be the one for "Servers"
        const [firstButton] = unpinButtons
        unpinButton = firstButton
      },
      { timeout: 3000 },
    )

    // Hover over the pinned item to make the unpin button visible
    const allButtons = await screen.findAllByRole('button')

    // Find the button that contains "Servers" text
    const serversButton = allButtons.find(button => button.textContent?.includes('Servers'))

    // oxlint-disable-next-line vitest/no-conditional-in-test
    if (serversButton) {
      await userEvent.hover(serversButton)
    }

    // oxlint-disable-next-line vitest/no-conditional-in-test
    if (unpinButton) {
      await userEvent.click(unpinButton)
    }

    expect(asFragment()).toMatchSnapshot()
  })

  it('with show hide feature', async () => {
    const onShowHide = vi.fn()
    const { asFragment } = renderWithTheme(<NavigationShowHide onShowHide={onShowHide} pinnedFeature />)

    expect(screen.getByText('Dashboard')).toBeVisible() // alwaysVisible set to true for this item
    expect(screen.queryByText('Servers')).not.toBeInTheDocument() // alwaysVisible not set to true for this item
    expect(screen.queryByTestId('pinned-group')).not.toBeInTheDocument() // pinned items are hidden when showHide="hide"

    const showButton = screen.getByTestId('show-hide')
    await userEvent.click(showButton)
    expect(onShowHide).toHaveBeenCalledOnce()

    expect(asFragment()).toMatchSnapshot()
  })

  it('with show hide feature - collapsed', async () => {
    const onShowHide = vi.fn()
    const { asFragment } = renderWithTheme(<NavigationShowHide onShowHide={onShowHide} pinnedFeature />)

    const collapseButton = screen.getByRole('button', {
      name: 'Collapse sidebar',
    })
    await userEvent.click(collapseButton)
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Expand sidebar' })).toBeVisible()
    })

    const showButton = screen.getByTestId('show-hide')
    await userEvent.click(showButton)
    expect(onShowHide).toHaveBeenCalledOnce()

    expect(asFragment()).toMatchSnapshot()
  })

  it('with nested items', async () => {
    const { asFragment } = renderWithTheme(<NavigationNested pinnedFeature />)
    const advancedItemMenu = screen.getByRole('button', { name: 'Compute' })
    await userEvent.hover(advancedItemMenu)
    expect(screen.getByTestId('advanced')).toBeInTheDocument()

    expect(asFragment()).toMatchSnapshot()
  })
})
