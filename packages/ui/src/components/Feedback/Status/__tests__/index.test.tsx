import { shouldMatchSnapshot } from '@utils/test'
import { describe, it } from 'vitest'
import { Status } from '..'
import { SENTIMENTS } from '../constant'

describe('status', () => {
  it.each(SENTIMENTS)('renders correctly with type="%s"', sentiment =>
    shouldMatchSnapshot(<Status sentiment={sentiment} />),
  )

  it('render animated', () => shouldMatchSnapshot(<Status animated sentiment="success" />))

  it('render with className', () => shouldMatchSnapshot(<Status className="test" sentiment="success" />))
})
