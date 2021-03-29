import React from 'react'
import ProgressCircle from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'
import { colors } from '../../../theme'

describe('Progress', () => {
  test(`renders default props`, () => {
    shouldMatchEmotionSnapshot(<ProgressCircle />)
  })

  test(`renders with percentage 75`, () => {
    shouldMatchEmotionSnapshot(<ProgressCircle percentage={75} />)
  })

  Object.keys(colors)
    .slice(0, 5)
    .forEach(color => {
      test(`renders with pathColor ${color}`, () => {
        shouldMatchEmotionSnapshot(<ProgressCircle pathColor={color} />)
      })
    })

  Object.keys(colors)
    .slice(0, 5)
    .forEach(color => {
      test(`renders with trailColor ${color}`, () => {
        shouldMatchEmotionSnapshot(<ProgressCircle trailColor={color} />)
      })
    })

  test(`renders with strokeWidth 25`, () => {
    shouldMatchEmotionSnapshot(<ProgressCircle strokeWidth={25} />)
  })

  test(`renders with text 100%`, () => {
    shouldMatchEmotionSnapshot(<ProgressCircle text="100%" />)
  })
})
