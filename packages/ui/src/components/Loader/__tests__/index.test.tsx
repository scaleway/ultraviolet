import { shouldMatchSnapshot } from '@utils/test'
import { describe, test } from 'vitest'

import { Loader } from '..'
import { SENTIMENTS } from '../../../theme'
import { SIZES } from '../constants'

import type { ComponentProps } from 'react'

describe('loader', () => {
  test('renders default props', () =>
    shouldMatchSnapshot(<Loader label="Loading test" />))

  test('renders active with default percentage', () =>
    shouldMatchSnapshot(<Loader active label="Loading test" />))

  test('renders active with custom percentage', () =>
    shouldMatchSnapshot(<Loader active label="Loading test" />))

  test('renders with percentage 75', () =>
    shouldMatchSnapshot(<Loader active label="Loading test" percentage={75} />))

  test('renders with color neutral and primary', () =>
    shouldMatchSnapshot(
      <>
        <Loader label="Loading test" sentiment="neutral" />
        <Loader label="Loading test" sentiment="primary" />
      </>,
    ))

  SENTIMENTS.slice(0, 5).forEach(color => {
    test(`renders with sentiment ${color}`, () =>
      shouldMatchSnapshot(<Loader label="Loading test" sentiment={color} />))
  })

  Object.keys(SIZES).forEach(size => {
    test(`renders with size ${size}`, () =>
      shouldMatchSnapshot(
        <Loader
          label="Loading test"
          size={size as ComponentProps<typeof Loader>['size']}
        />,
      ))
  })
})
