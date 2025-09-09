import { shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, test } from 'vitest'
import { ActionBar } from '..'

describe('actionBar', () => {
  test('renders correctly ', () =>
    shouldMatchEmotionSnapshot(<ActionBar>Hello</ActionBar>))

  test('renders correctly with custom rank', () =>
    shouldMatchEmotionSnapshot(<ActionBar rank={2}>I am rank 2</ActionBar>))
})
