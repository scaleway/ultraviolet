import { shouldMatchSnapshot } from '@utils/test'
import { describe, test } from 'vitest'
import { Status } from '..'
import { SENTIMENTS } from '../constant'

describe('status', () => {
  test.each(SENTIMENTS)('renders correctly with type="%s"', sentiment =>
    shouldMatchSnapshot(<Status sentiment={sentiment} />))

  test('render animated', () =>
    shouldMatchSnapshot(<Status animated sentiment="success" />))

  test('render with className', () =>
    shouldMatchSnapshot(<Status className="test" sentiment="success" />))
})
