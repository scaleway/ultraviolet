import Notice from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

describe('Notice', () => {
  test(`renders correctly with default props`, () =>
    shouldMatchEmotionSnapshot(<Notice>Hello</Notice>))
})
