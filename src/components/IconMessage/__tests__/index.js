import React from 'react'
import { IconMessage } from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('ButIconMessageton', () => {
  test('renders correctly', () => {
    shouldMatchEmotionSnapshot(<IconMessage>This is default.</IconMessage>)
  })

  test('renders correctly with variant and icon', () => {
    shouldMatchEmotionSnapshot(
      <IconMessage variant="info" icon="information-outline">
        This is default.
      </IconMessage>,
    )
  })
})
