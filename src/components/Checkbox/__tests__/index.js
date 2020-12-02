import React from 'react'
import { Checkbox } from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('Checkbox', () => {
  test('renders correctly', () => {
    shouldMatchEmotionSnapshot(<Checkbox>Checkbox Label</Checkbox>)
  })
  test('renders correctly disabled', () => {
    shouldMatchEmotionSnapshot(<Checkbox disabled>Checkbox Label</Checkbox>)
  })
  test('renders correctly checked', () => {
    shouldMatchEmotionSnapshot(<Checkbox checked>Checkbox Label</Checkbox>)
  })
  test('renders correctly checked and disabled', () => {
    shouldMatchEmotionSnapshot(
      <Checkbox checked disabled>
        Checkbox Label
      </Checkbox>,
    )
  })
  test('renders correctly with an error', () => {
    shouldMatchEmotionSnapshot(
      <Checkbox error="test error">Checkbox Label</Checkbox>,
    )
  })
  test('renders correctly with valid', () => {
    shouldMatchEmotionSnapshot(<Checkbox valid>Checkbox Label</Checkbox>)
  })
  test('renders correctly with a value', () => {
    shouldMatchEmotionSnapshot(<Checkbox value="test">Checkbox Label</Checkbox>)
  })
})
