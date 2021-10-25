import React from 'react'
import ActivityIndicator from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'
import { colors } from '../../../theme'

describe('ActivityIndicator', () => {
  test(`renders default props`, () =>
    shouldMatchEmotionSnapshot(<ActivityIndicator />))

  test(`renders active with default percentage`, () =>
    shouldMatchEmotionSnapshot(<ActivityIndicator active />))

  test(`renders active with custom percentage`, () =>
    shouldMatchEmotionSnapshot(<ActivityIndicator active />))

  test(`renders with percentage 75`, () =>
    shouldMatchEmotionSnapshot(<ActivityIndicator active percentage={75} />))

  Object.keys(colors)
    .slice(0, 5)
    .forEach(color => {
      test(`renders with color ${color}`, () =>
        shouldMatchEmotionSnapshot(<ActivityIndicator color={color} />))
    })

  test(`renders with inlined color`, () =>
    shouldMatchEmotionSnapshot(<ActivityIndicator color="#ff0000" />))

  Object.keys(colors)
    .slice(0, 5)
    .forEach(color => {
      test(`renders with trailColor ${color}`, () =>
        shouldMatchEmotionSnapshot(<ActivityIndicator trailColor={color} />))
    })

  test(`renders with inlined trailColor`, () =>
    shouldMatchEmotionSnapshot(<ActivityIndicator trailColor="#ff0000" />))

  test(`renders with strokeWidth 25`, () =>
    shouldMatchEmotionSnapshot(<ActivityIndicator strokeWidth={25} />))

  test(`renders with text 100%`, () =>
    shouldMatchEmotionSnapshot(<ActivityIndicator text="100%" />))

  test(`renders with custom size`, () =>
    shouldMatchEmotionSnapshot(<ActivityIndicator size="100px" />))
})
