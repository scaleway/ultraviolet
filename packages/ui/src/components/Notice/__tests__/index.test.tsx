import { shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, test } from 'vitest'
import { Notice } from '..'

describe('Notice', () => {
  test(`renders correctly with default props`, () =>
    shouldMatchEmotionSnapshot(<Notice>Hello</Notice>))
})
