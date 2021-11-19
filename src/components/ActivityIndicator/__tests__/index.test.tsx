import React from 'react'
import ActivityIndicator from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'
import { colors } from '../../../theme'

describe('ActivityIndicator', () => {
  test(`renders default props`, () =>
    shouldMatchEmotionSnapshot(<ActivityIndicator label="Loading test" />))

  test(`renders active with default percentage`, () =>
    shouldMatchEmotionSnapshot(
      <ActivityIndicator label="Loading test" active />,
    ))

  test(`renders active with custom percentage`, () =>
    shouldMatchEmotionSnapshot(
      <ActivityIndicator label="Loading test" active />,
    ))

  test(`renders with percentage 75`, () =>
    shouldMatchEmotionSnapshot(
      <ActivityIndicator label="Loading test" active percentage={75} />,
    ))

  Object.keys(colors)
    .slice(0, 5)
    .forEach(color => {
      test(`renders with color ${color}`, () =>
        shouldMatchEmotionSnapshot(
          <ActivityIndicator label="Loading test" color={color} />,
        ))
    })

  test(`renders with inlined color`, () =>
    shouldMatchEmotionSnapshot(
      <ActivityIndicator label="Loading test" color="#ff0000" />,
    ))

  Object.keys(colors)
    .slice(0, 5)
    .forEach(color => {
      test(`renders with trailColor ${color}`, () =>
        shouldMatchEmotionSnapshot(
          <ActivityIndicator label="Loading test" trailColor={color} />,
        ))
    })

  test(`renders with inlined trailColor`, () =>
    shouldMatchEmotionSnapshot(
      <ActivityIndicator label="Loading test" trailColor="#ff0000" />,
    ))

  test(`renders with strokeWidth 25`, () =>
    shouldMatchEmotionSnapshot(
      <ActivityIndicator label="Loading test" strokeWidth={25} />,
    ))

  test(`renders with text 100%`, () =>
    shouldMatchEmotionSnapshot(
      <ActivityIndicator label="Loading test" text="100%" />,
    ))

  test(`renders with custom size`, () =>
    shouldMatchEmotionSnapshot(
      <ActivityIndicator label="Loading test" size="100px" />,
    ))
})
