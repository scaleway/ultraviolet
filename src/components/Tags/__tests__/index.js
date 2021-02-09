import React from 'react'
import { Tags } from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('Tags', () => {
  test('renders correctly with base props', () => {
    shouldMatchEmotionSnapshot(<Tags onChange={() => {}} name="radio" />)
  })

  test('renders correctly with some tags', () => {
    shouldMatchEmotionSnapshot(
      <Tags onChange={() => {}} name="radio" tags={['hello', 'world']} />,
    )
  })

  test('renders correctly with some tags', () => {
    shouldMatchEmotionSnapshot(
      <Tags onChange={() => {}} name="radio" tags={['hello', 'world']} />,
    )
  })

  test('renders correctly with some tags as objects', () => {
    shouldMatchEmotionSnapshot(
      <Tags
        onChange={() => {}}
        name="radio"
        areTagsObject
        tags={[{ label: 'hello' }, { label: 'world' }]}
      />,
    )
  })

  test('renders correctly when variant = bordered', () => {
    shouldMatchEmotionSnapshot(
      <Tags
        onChange={() => {}}
        name="radio"
        tags={['hello', 'world']}
        variant="bordered"
      />,
    )
  })

  test('renders correctly when variant = bordered and borderedContainer = false', () => {
    shouldMatchEmotionSnapshot(
      <Tags
        onChange={() => {}}
        name="radio"
        tags={['hello', 'world']}
        variant="bordered"
        borderedContainer={false}
      />,
    )
  })

  test('renders correctly when manualInput is disabled', () => {
    shouldMatchEmotionSnapshot(
      <Tags
        onChange={() => {}}
        name="radio"
        tags={['hello', 'world']}
        manualInput={false}
      />,
    )
  })
})
