import { shouldMatchSnapshot } from '@utils/test'
import { describe, it } from 'vitest'

import { Notice } from '..'

describe('notice', () => {
  it('renders correctly with default props', () => shouldMatchSnapshot(<Notice>Hello</Notice>))
})
