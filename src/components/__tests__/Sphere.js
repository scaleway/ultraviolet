import React from 'react'
import shouldMatchEmotionSnapshot from 'helpers/shouldMatchEmotionSnapshot'
import { Sphere } from '../Sphere'

test('Sphere renders correctly with default values', () => {
  shouldMatchEmotionSnapshot(<Sphere />)
})

test('Sphere renders correctly when halved', () => {
  shouldMatchEmotionSnapshot(<Sphere bgColors={['#333', '#666']} />)
})

test('Sphere renders correctly with one char and smaller', () => {
  shouldMatchEmotionSnapshot(
    <Sphere
      text="★"
      bgColors={['#000']}
      textColor="#fff"
      size={20}
      textSize={10}
    />,
  )
})
