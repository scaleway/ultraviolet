import React from 'react'
import { Switch } from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('Switch', () => {
  test('renders correctly', () => {
    shouldMatchEmotionSnapshot(<Switch onChange={() => {}} />)
  })

  test('renders correctly when checked', () => {
    shouldMatchEmotionSnapshot(<Switch onChange={() => {}} checked />)
  })

  test('renders correctly when disabled', () => {
    shouldMatchEmotionSnapshot(<Switch onChange={() => {}} disabled />)
  })

  test('renders correctly with non default variant', () => {
    shouldMatchEmotionSnapshot(<Switch onChange={() => {}} variant="success" />)
  })

  test('renders correctly with non default size', () => {
    shouldMatchEmotionSnapshot(<Switch onChange={() => {}} size="small" />)
  })

  test('renders correctly with custom width', () => {
    shouldMatchEmotionSnapshot(<Switch onChange={() => {}} width={120} />)
  })

  test('renders correctly labeled', () => {
    shouldMatchEmotionSnapshot(<Switch onChange={() => {}} labeled />)
  })

  test('renders correctly with custom labels', () => {
    shouldMatchEmotionSnapshot(
      <Switch onChange={() => {}} labeled onLabel="Yes" offLabel="No" />,
    )
  })
})
