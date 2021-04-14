import React from 'react'
import IconMessage from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('IconMessage', () => {
  test('renders correctly', () => {
    shouldMatchEmotionSnapshot(<IconMessage>This is default.</IconMessage>)
  })

  test('renders correctly with variant and icon', () => {
    shouldMatchEmotionSnapshot(
      <IconMessage variant="primary" icon="information-outline">
        This is variant
      </IconMessage>,
    )
  })
})
