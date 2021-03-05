import React from 'react'
import { Information } from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('Information', () => {
  test(`should render correctly with default props`, () => {
    shouldMatchEmotionSnapshot(<Information>Hello</Information>)
  })

  test(`should render correctly with a custom backgroundColor`, () => {
    shouldMatchEmotionSnapshot(
      <Information backgroundColor="green">Hello</Information>,
    )
  })

  test(`should render correctly with a custom color`, () => {
    shouldMatchEmotionSnapshot(<Information color="green">Hello</Information>)
  })

  test(`should render correctly with an icon`, () => {
    shouldMatchEmotionSnapshot(
      <Information icon="check" iconColor="green" iconSize={24}>
        Hello
      </Information>,
    )
  })

  test(`should render correctly with an image`, () => {
    shouldMatchEmotionSnapshot(
      <Information img="//img.jpg" imgSize={24}>
        Hello
      </Information>,
    )
  })

  test(`should render correctly with an heading`, () => {
    shouldMatchEmotionSnapshot(
      <Information heading="Bonjour">Hello</Information>,
    )
  })
})
