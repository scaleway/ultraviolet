import { RayTopArrowIcon } from '@ultraviolet/icons'
import { shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, test } from 'vitest'
import { Separator } from '..'

describe('Separator', () => {
  test(`renders correctly with default props`, () =>
    shouldMatchEmotionSnapshot(<Separator />))
  test(`renders correctly with custom thickness`, () =>
    shouldMatchEmotionSnapshot(<Separator thickness={3} />))
  test(`renders correctly vertically`, () =>
    shouldMatchEmotionSnapshot(<Separator direction="vertical" />))
  test(`renders correctly horizontally`, () =>
    shouldMatchEmotionSnapshot(<Separator direction="horizontal" />))

  test(`renders correctly with custom color`, () =>
    shouldMatchEmotionSnapshot(<Separator color="primary" />))

  test(`renders correctly with custom color`, () =>
    shouldMatchEmotionSnapshot(<Separator sentiment="primary" />))

  test(`renders correctly with custom icon`, () =>
    shouldMatchEmotionSnapshot(
      <Separator>
        <RayTopArrowIcon />
      </Separator>,
    ))

  test(`renders correctly with custom sentiment and icon`, () =>
    shouldMatchEmotionSnapshot(
      <Separator sentiment="primary">
        <RayTopArrowIcon />
      </Separator>,
    ))
  test(`renders correctly with custom icon vertically`, () =>
    shouldMatchEmotionSnapshot(
      <Separator direction="vertical">
        <RayTopArrowIcon />
      </Separator>,
    ))
  test(`renders correctly with custom icon horizontally`, () =>
    shouldMatchEmotionSnapshot(
      <Separator direction="horizontal">
        <RayTopArrowIcon />
      </Separator>,
    ))
})
