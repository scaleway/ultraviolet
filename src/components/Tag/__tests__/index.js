import React from 'react'
import { Tag } from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('Tag', () => {
  test('Tag renders correctly', () => {
    shouldMatchEmotionSnapshot(<Tag>test</Tag>)
  })

  test('Tag renders correctly bordered', () => {
    shouldMatchEmotionSnapshot(<Tag variant="bordered">test</Tag>)
  })

  test('Description renders correctly disabled', () => {
    shouldMatchEmotionSnapshot(<Tag disabled>test</Tag>)
  })
})
