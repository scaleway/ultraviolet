import { shouldMatchEmotionSnapshot } from '@utils/test'
import type { ComponentProps } from 'react'
import { describe, test } from 'vitest'
import { SENTIMENTS } from '../../../theme'
import { Loader } from '..'
import { SIZES } from '../constants'

describe('loader', () => {
  test(`renders default props`, () =>
    shouldMatchEmotionSnapshot(<Loader label="Loading test" />))

  test(`renders active with default percentage`, () =>
    shouldMatchEmotionSnapshot(<Loader active label="Loading test" />))

  test(`renders active with custom percentage`, () =>
    shouldMatchEmotionSnapshot(<Loader active label="Loading test" />))

  test(`renders with percentage 75`, () =>
    shouldMatchEmotionSnapshot(
      <Loader active label="Loading test" percentage={75} />,
    ))

  test(`renders with color neutral and primary`, () =>
    shouldMatchEmotionSnapshot(
      <>
        <Loader label="Loading test" sentiment="neutral" />
        <Loader label="Loading test" sentiment="primary" />
      </>,
    ))

  SENTIMENTS.slice(0, 5).forEach(color => {
    test(`renders with sentiment ${color}`, () =>
      shouldMatchEmotionSnapshot(
        <Loader label="Loading test" sentiment={color} />,
      ))
  })

  Object.keys(SIZES).forEach(size => {
    test(`renders with size ${size}`, () =>
      shouldMatchEmotionSnapshot(
        <Loader
          label="Loading test"
          size={size as ComponentProps<typeof Loader>['size']}
        />,
      ))
  })
})
