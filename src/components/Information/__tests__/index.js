import React from 'react'
import { Information } from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('Information', () => {
  test(`should render correctly with default props`, () => {
    shouldMatchEmotionSnapshot(<Information>Hello</Information>)
  })

  test(`should render correctly with a custom backgroundColor`, () => {
    shouldMatchEmotionSnapshot(
      <Information backgroundColor="guess who s black">Hello</Information>,
    )
  })

  test(`should render correctly with an icon`, () => {
    shouldMatchEmotionSnapshot(<Information icon="check">Hello</Information>)
  })

  test(`should render correctly with an image`, () => {
    shouldMatchEmotionSnapshot(<Information img="//img.jpg">Hello</Information>)
  })

  test(`should render correctly with an heading`, () => {
    shouldMatchEmotionSnapshot(
      <Information heading="Bonjour">Hello</Information>,
    )
  })

  test(`should render correctly with a text`, () => {
    shouldMatchEmotionSnapshot(<Information text="Bonjour">Hello</Information>)
  })
})
