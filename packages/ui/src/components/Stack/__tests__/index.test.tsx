import { shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, test } from 'vitest'
import { Stack } from '..'

describe('Stack', () => {
  test(`should render correctly with default props`, () =>
    shouldMatchEmotionSnapshot(
      <Stack>
        <div>first child</div>
        <div>second child</div>
        <div>third child</div>
      </Stack>,
    ))

  test(`should render correctly with row direction`, () =>
    shouldMatchEmotionSnapshot(
      <Stack direction="row">
        <div>first child</div>
        <div>second child</div>
        <div>third child</div>
      </Stack>,
    ))

  test(`should render correctly with alignCenter`, () =>
    shouldMatchEmotionSnapshot(
      <Stack alignItems="center" direction="row">
        <div>first child</div>
        <div>second child</div>
      </Stack>,
    ))

  test(`should render correctly with wrap as boolean`, () =>
    shouldMatchEmotionSnapshot(
      <Stack direction="row" wrap>
        <div>first child</div>
        <div>second child</div>
      </Stack>,
    ))

  test(`should render correctly with wrap as string`, () =>
    shouldMatchEmotionSnapshot(
      <Stack direction="row" wrap="wrap-reverse">
        <div>first child</div>
        <div>second child</div>
      </Stack>,
    ))

  test(`should render correctly with width 100%`, () =>
    shouldMatchEmotionSnapshot(
      <Stack width="100%">
        <div>first child</div>
        <div>second child</div>
      </Stack>,
    ))

  test(`should render correctly max width 100%`, () =>
    shouldMatchEmotionSnapshot(
      <Stack maxWidth="100%">
        <div>first child</div>
        <div>second child</div>
      </Stack>,
    ))

  test(`should render correctly min width 100%`, () =>
    shouldMatchEmotionSnapshot(
      <Stack minWidth="100%">
        <div>first child</div>
        <div>second child</div>
      </Stack>,
    ))

  test(`should render different direction and gap on different viewport sizes`, () => {
    shouldMatchEmotionSnapshot(
      <Stack
        direction={{
          large: 'row',
          medium: 'row',
          small: 'row',
          xlarge: 'row',
          xsmall: 'column',
          xxsmall: 'column',
        }}
        gap={{
          large: 5,
          medium: 4,
          small: 3,
          xlarge: 6,
          xsmall: 2,
          xxsmall: 1,
        }}
      >
        <div>first child</div>
        <div>second child</div>
        <div>third child</div>
      </Stack>,
    )
  })
})
