import { Menu, arrowPlacements } from '..'
import {
  shouldMatchEmotionSnapshot,
  shouldMatchEmotionSnapshotWithPortal,
} from '../../../../.jest/helpers'

describe('Menu', () => {
  test('renders with disclosure not a function', () =>
    shouldMatchEmotionSnapshotWithPortal(
      <Menu
        baseId="menu"
        disclosure={<button type="button">Menu is visible</button>}
      >
        <Menu.Item>Menu.Item should not be visible in test</Menu.Item>
      </Menu>,
    ))
  test('renders with visible=false', () =>
    shouldMatchEmotionSnapshotWithPortal(
      <Menu
        baseId="menu"
        disclosure={() => <button type="button">Menu is visible</button>}
      >
        <Menu.Item>Menu.Item should not be visible in test</Menu.Item>
      </Menu>,
    ))
  test(`renders with Menu.Item`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <Menu
        visible
        baseId="menu"
        disclosure={() => <button type="button">Menu</button>}
      >
        <Menu.Item>Menu.Item</Menu.Item>
      </Menu>,
    ))

  test(`renders with Menu.ItemLink`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <Menu
        visible
        baseId="menu-1"
        disclosure={() => <button type="button">Menu</button>}
      >
        <Menu.Item href="/link">Menu.Item as Link</Menu.Item>
      </Menu>,
    ))

  test(`renders with Menu.ItemLink & Menu.Item disabled`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <Menu
        visible
        baseId="menu-1"
        disclosure={() => <button type="button">Menu</button>}
      >
        <Menu.Item disabled>Menu.Item disabled</Menu.Item>
        <Menu.Item href="/link" disabled>
          Menu.Item Link disabled
        </Menu.Item>
        <Menu.Item href="https://link" disabled>
          Menu.Item Link disabled
        </Menu.Item>
      </Menu>,
    ))

  describe('placement', () => {
    test.each(arrowPlacements)('renders "%s"', placement =>
      shouldMatchEmotionSnapshot(
        <Menu
          visible
          baseId={placement}
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

    test(`render with variant danger`, () =>
      shouldMatchEmotionSnapshot(
        <Menu.Item variant="danger">Danger</Menu.Item>,
      ))

    test(`render with variant nav`, () =>
      shouldMatchEmotionSnapshot(
        <Menu.Item variant="nav" href="/test">
          Nav
        </Menu.Item>,
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
