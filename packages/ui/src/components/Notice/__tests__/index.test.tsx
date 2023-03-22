import { Notice } from '..'
import { shouldMatchEmotionSnapshot } from '../../../../.jest/helpers'

describe('Notice', () => {
  test(`renders correctly with default props`, () =>
    shouldMatchEmotionSnapshot(<Notice>Hello</Notice>))
})
