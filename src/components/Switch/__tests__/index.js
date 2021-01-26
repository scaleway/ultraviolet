import React from 'react'
import { Switch } from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('Switch', () => {
  test('renders correctly', () => {
    shouldMatchEmotionSnapshot(<Switch name="test" onChange={() => {}} />)
  })

  test('renders correctly when checked', () => {
    shouldMatchEmotionSnapshot(
      <Switch name="test" onChange={() => {}} checked />,
    )
  })

  test('renders correctly when disabled', () => {
    shouldMatchEmotionSnapshot(
      <Switch name="test" onChange={() => {}} disabled />,
    )
  })

  test('renders correctly with non default variant', () => {
    shouldMatchEmotionSnapshot(
      <Switch name="test" onChange={() => {}} variant="success" />,
    )
  })

  test('renders correctly with non default size', () => {
    shouldMatchEmotionSnapshot(
      <Switch name="test" onChange={() => {}} size="small" />,
    )
  })

  test('renders correctly with custom width', () => {
    shouldMatchEmotionSnapshot(
      <Switch name="test" onChange={() => {}} width={120} />,
    )
  })

  test('renders correctly labeled', () => {
    shouldMatchEmotionSnapshot(
      <Switch name="test" onChange={() => {}} labeled />,
    )
  })

  test('renders correctly with custom labels', () => {
    shouldMatchEmotionSnapshot(
      <Switch
        name="test"
        onChange={() => {}}
        labeled
        onLabel="Yes"
        offLabel="No"
      />,
    )
  })
})
