import { shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, test } from 'vitest'
import { Notice } from '..'

describe('notice', () => {
  test(`renders correctly with default props`, () =>
    shouldMatchEmotionSnapshot(<Notice>Hello</Notice>))
})
