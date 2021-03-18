import React from 'react'
import Avatar from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('Avatar', () => {
  it('renders correctly with default props', () => {
    shouldMatchEmotionSnapshot(<Avatar />)
  })

  it('renders correctly with sentence', () => {
    shouldMatchEmotionSnapshot(<Avatar text="Hello World" />)
  })

  it('renders correctly with lock', () => {
    shouldMatchEmotionSnapshot(<Avatar text="HelloWorld" lock />)
  })

  it('renders correctly with text', () => {
    shouldMatchEmotionSnapshot(<Avatar text="HelloWorld" />)
  })

  it('renders correctly with small text', () => {
    shouldMatchEmotionSnapshot(<Avatar text="HW" />)
  })

  it('renders correctly with text and custom style', () => {
    shouldMatchEmotionSnapshot(
      <Avatar text="HW" textBgColor="red" textColor="white" textSize={14} />,
    )
  })
})
