import { shouldMatchSnapshot } from '@utils/test'
import type { ComponentProps } from 'react'
import { describe, it } from 'vitest'
import { Loader } from '..'
import { SENTIMENTS } from '../../../theme'
import { SIZES } from '../constants'

describe('loader', () => {
  it('renders default props', () => shouldMatchSnapshot(<Loader label="Loading test" />))

  it('renders active with default percentage', () => shouldMatchSnapshot(<Loader active label="Loading test" />))

  it('renders active with custom percentage', () => shouldMatchSnapshot(<Loader active label="Loading test" />))

  it('renders with percentage 75', () => shouldMatchSnapshot(<Loader active label="Loading test" percentage={75} />))

  it('renders with color neutral and primary', () =>
    shouldMatchSnapshot(
      <>
        <Loader label="Loading test" sentiment="neutral" />
        <Loader label="Loading test" sentiment="primary" />
      </>,
    ))

  it.each(SENTIMENTS.slice(0, 5))(`renders with sentiment %s`, sentiment =>
    shouldMatchSnapshot(<Loader label="Loading test" sentiment={sentiment} />),
  )

  it.each(Object.keys(SIZES))(`renders with size %s`, size =>
    shouldMatchSnapshot(<Loader label="Loading test" size={size as ComponentProps<typeof Loader>['size']} />),
  )
})
