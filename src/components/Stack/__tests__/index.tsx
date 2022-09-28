import Stack from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

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

  test(`should render correctly with alighCenter`, () =>
    shouldMatchEmotionSnapshot(
      <Stack direction="row" alignItems="center">
        <div>first child</div>
        <div>second child</div>
      </Stack>,
    ))
})
