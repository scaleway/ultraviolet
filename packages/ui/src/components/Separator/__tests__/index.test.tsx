import { RayTopArrowIcon } from '@ultraviolet/icons/RayTopArrowIcon'
import { shouldMatchSnapshot } from '@utils/test'
import { describe, it } from 'vitest'
import { Separator } from '..'

describe('separator', () => {
  it('renders correctly with default props', () => shouldMatchSnapshot(<Separator />))
  it('renders correctly with custom thickness', () => shouldMatchSnapshot(<Separator thickness={3} />))
  it('renders correctly vertically', () => shouldMatchSnapshot(<Separator direction="vertical" />))
  it('renders correctly horizontally', () => shouldMatchSnapshot(<Separator direction="horizontal" />))

  it('renders correctly with custom sentiment', () => shouldMatchSnapshot(<Separator sentiment="primary" />))

  it('renders correctly with custom icon', () =>
    shouldMatchSnapshot(
      <Separator>
        <RayTopArrowIcon />
      </Separator>,
    ))

  it('renders correctly with custom sentiment and icon', () =>
    shouldMatchSnapshot(
      <Separator sentiment="primary">
        <RayTopArrowIcon />
      </Separator>,
    ))
  it('renders correctly with custom icon vertically', () =>
    shouldMatchSnapshot(
      <Separator direction="vertical">
        <RayTopArrowIcon />
      </Separator>,
    ))
  it('renders correctly with custom icon horizontally', () =>
    shouldMatchSnapshot(
      <Separator direction="horizontal">
        <RayTopArrowIcon />
      </Separator>,
    ))
})
