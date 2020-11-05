import React from 'react'
import { UniversalLink } from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('UniversalLink', () => {
  test('renders correctly with defaults', () => {
    shouldMatchEmotionSnapshot(<UniversalLink>This is a link</UniversalLink>)
  })

  test('renders correctly with href', () => {
    shouldMatchEmotionSnapshot(
      <UniversalLink href="/">This is a link</UniversalLink>,
    )
  })

  test('renders correctly with to prop', () => {
    shouldMatchEmotionSnapshot(
      <UniversalLink to="/">This is a link</UniversalLink>,
    )
  })

  test('renders correctly with an absolute utl', () => {
    shouldMatchEmotionSnapshot(
      <UniversalLink to="https://google.com" target="_blank">
        This is a link
      </UniversalLink>,
    )
  })

  test('renders correctly with a taregt blank', () => {
    shouldMatchEmotionSnapshot(
      <UniversalLink to="/" target="_blank">
        This is a link
      </UniversalLink>,
    )
  })
})
