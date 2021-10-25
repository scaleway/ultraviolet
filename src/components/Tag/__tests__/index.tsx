import React from 'react'
import Tag from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

describe('Tag', () => {
  test('renders correctly', () => shouldMatchEmotionSnapshot(<Tag>test</Tag>))

  test('renders correctly bordered', () =>
    shouldMatchEmotionSnapshot(<Tag variant="bordered">test</Tag>))

  test('renders correctly disabled', () =>
    shouldMatchEmotionSnapshot(<Tag disabled>test</Tag>))
})
