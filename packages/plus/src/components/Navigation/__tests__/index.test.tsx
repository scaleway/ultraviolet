import { fireEvent, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { UseCaseCategoryIcon } from '@ultraviolet/icons/category'
import { renderWithTheme, shouldMatchSnapshot } from '@utils/test'
import type { ComponentProps } from 'react'
import { describe, expect, test } from 'vitest'
import { Navigation, NavigationProvider } from '..'

type BasicNavigationProps = Pick<
  ComponentProps<typeof NavigationProvider>,
  'pinnedFeature'
>

const BasicNavigation = ({ pinnedFeature = true }: BasicNavigationProps) => (
  <NavigationProvider pinnedFeature={pinnedFeature}>
    <Navigation logo={<p>Logo</p>}>
      <Navigation.PinnedItems />
      <Navigation.Separator />
      <Navigation.Group label="Products">
        <Navigation.Item
          active
          categoryIcon={<UseCaseCategoryIcon variant="neutral" />}
          id="item1"
          label="item1"
          noPinButton
        />
        <Navigation.Item
          categoryIcon={<UseCaseCategoryIcon />}
          id="item1"
          label="item1"
        />
      </Navigation.Group>
      {/* @ts-expect-error we try to test whe no children is provided */}
      <Navigation.Group label="Empty Group" />
    </Navigation>
  </NavigationProvider>
)

describe('navigation', () => {
  test('render with basic content', () =>
    shouldMatchSnapshot(<BasicNavigation />))

  test('render without pinnedFeature', () =>
    shouldMatchSnapshot(<BasicNavigation pinnedFeature={false} />))

  test('click on expand / collapse button', async () => {
    const { asFragment } = renderWithTheme(<BasicNavigation />)

    expect(asFragment()).toMatchSnapshot()

    const collapseButton = screen.getByRole('button', {
      name: 'Collapse sidebar',
    })
    await userEvent.click(collapseButton)
    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: 'Expand sidebar' }),
      ).toBeVisible()
    })
    expect(asFragment()).toMatchSnapshot()

    const expandButton = screen.getByRole('button', {
      name: 'Expand sidebar',
    })
    await userEvent.click(expandButton)
    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: 'Collapse sidebar' }),
      ).toBeVisible()
    })
  })

  test('resize manually the navigation using slider', () => {
    const { asFragment } = renderWithTheme(<BasicNavigation />)

    const slider = screen.getByTestId('slider')

    const mouseEventExtend = new MouseEvent('mousedown', {
      clientX: 100,
    })

    slider.dispatchEvent(mouseEventExtend)

    expect(asFragment()).toMatchSnapshot()
  })

  test('pin and unpin an item', async () => {
    const { asFragment } = renderWithTheme(<BasicNavigation />)

    expect(screen.getByText('You have no pinned items.')).toBeInTheDocument()

    const pinButton = screen.getAllByRole('button', {
      name: 'pin',
    })[0]

    fireEvent.click(pinButton)
    expect(asFragment()).toMatchSnapshot()

    const pinnedGroup = screen.getByTestId('pinned-group')
    fireEvent.click(pinnedGroup)

    expect(asFragment()).toMatchSnapshot()

    await waitFor(() => {
      expect(
        screen.getAllByRole('button', {
          name: 'unpin',
        })[0],
      ).toBeInTheDocument()
    })

    const unpinButton = screen.getAllByRole('button', {
      name: 'unpin',
    })[0]

    fireEvent.click(unpinButton)
    expect(asFragment()).toMatchSnapshot()
  })
})
