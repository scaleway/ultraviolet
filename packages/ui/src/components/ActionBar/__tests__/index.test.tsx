import { shouldMatchSnapshot } from '@utils/test'
import { describe, it } from 'vitest'

import { ActionBar } from '..'

describe('actionBar', () => {
  it('renders correctly ', () =>
    shouldMatchSnapshot(<ActionBar>Hello</ActionBar>))

  it('renders correctly with custom rank', () =>
    shouldMatchSnapshot(<ActionBar rank={2}>I am rank 2</ActionBar>))
})
