import React from 'react'
import Sphere from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

describe('Sphere', () => {
  test('renders correctly with default values', () =>
    shouldMatchEmotionSnapshot(<Sphere />))

  test('renders correctly when halved', () =>
    shouldMatchEmotionSnapshot(<Sphere bgColors={['#333', '#666']} />))

  test('renders correctly with one char and smaller', () =>
    shouldMatchEmotionSnapshot(
      <Sphere
        text="★"
        bgColors={['#000']}
        textColor="#fff"
        size={20}
        textSize={10}
      />,
    ))
})
