import Stack from '..'
import { shouldMatchEmotionSnapshot } from '../../../../.jest/helpers'

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
      <Stack direction="row" alignItems="center">
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
})
