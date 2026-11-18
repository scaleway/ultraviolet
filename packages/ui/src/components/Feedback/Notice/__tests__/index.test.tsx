import { describe, it } from 'vitest'
import { Notice } from '..'
import { shouldMatchSnapshot } from '../../../../__tests__/helpers'

describe('notice', () => {
  it('renders correctly with default props', () => shouldMatchSnapshot(<Notice>Hello</Notice>))
})
