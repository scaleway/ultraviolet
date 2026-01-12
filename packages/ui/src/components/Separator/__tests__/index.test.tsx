import { RayTopArrowIcon } from '@ultraviolet/icons'
import { shouldMatchSnapshot } from '@utils/test'
import { describe, test } from 'vitest'
import { Separator } from '..'

describe('separator', () => {
  test('renders correctly with default props', () =>
    shouldMatchSnapshot(<Separator />))
  test('renders correctly with custom thickness', () =>
    shouldMatchSnapshot(<Separator thickness={3} />))
  test('renders correctly vertically', () =>
    shouldMatchSnapshot(<Separator direction="vertical" />))
  test('renders correctly horizontally', () =>
    shouldMatchSnapshot(<Separator direction="horizontal" />))

  test('renders correctly with custom sentiment', () =>
    shouldMatchSnapshot(<Separator sentiment="primary" />))

  test('renders correctly with custom icon', () =>
    shouldMatchSnapshot(
      <Separator>
        <RayTopArrowIcon />
      </Separator>,
    ))

  test('renders correctly with custom sentiment and icon', () =>
    shouldMatchSnapshot(
      <Separator sentiment="primary">
        <RayTopArrowIcon />
      </Separator>,
    ))
  test('renders correctly with custom icon vertically', () =>
    shouldMatchSnapshot(
      <Separator direction="vertical">
        <RayTopArrowIcon />
      </Separator>,
    ))
  test('renders correctly with custom icon horizontally', () =>
    shouldMatchSnapshot(
      <Separator direction="horizontal">
        <RayTopArrowIcon />
      </Separator>,
    ))
})
