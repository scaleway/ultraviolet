import { shouldMatchSnapshot } from '@utils/test'
import { describe, test } from 'vitest'
import { Stack } from '..'

describe('stack', () => {
  test(`should render correctly with default props`, () =>
    shouldMatchSnapshot(
      <Stack>
        <div>first child</div>
        <div>second child</div>
        <div>third child</div>
      </Stack>,
    ))

  test(`should render correctly with row direction`, () =>
    shouldMatchSnapshot(
      <Stack direction="row">
        <div>first child</div>
        <div>second child</div>
        <div>third child</div>
      </Stack>,
    ))

  test(`should render correctly with alignCenter`, () =>
    shouldMatchSnapshot(
      <Stack alignItems="center" direction="row">
        <div>first child</div>
        <div>second child</div>
      </Stack>,
    ))

  test(`should render correctly with wrap as boolean`, () =>
    shouldMatchSnapshot(
      <Stack direction="row" wrap>
        <div>first child</div>
        <div>second child</div>
      </Stack>,
    ))

  test(`should render correctly with wrap as string`, () =>
    shouldMatchSnapshot(
      <Stack direction="row" wrap="wrap-reverse">
        <div>first child</div>
        <div>second child</div>
      </Stack>,
    ))

  test(`should render correctly with width 100%`, () =>
    shouldMatchSnapshot(
      <Stack width="100%">
        <div>first child</div>
        <div>second child</div>
      </Stack>,
    ))

  test(`should render correctly max width 100%`, () =>
    shouldMatchSnapshot(
      <Stack maxWidth="100%">
        <div>first child</div>
        <div>second child</div>
      </Stack>,
    ))

  test(`should render correctly min width 100%`, () =>
    shouldMatchSnapshot(
      <Stack minWidth="100%">
        <div>first child</div>
        <div>second child</div>
      </Stack>,
    ))

  test(`should render different direction and gap on different viewport sizes`, () => {
    shouldMatchSnapshot(
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
