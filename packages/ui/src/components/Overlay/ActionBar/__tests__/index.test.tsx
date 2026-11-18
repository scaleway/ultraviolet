import { describe, it } from 'vitest'
import { ActionBar } from '..'
import { shouldMatchSnapshot } from '../../../../__tests__/helpers'

describe('actionBar', () => {
  it('renders correctly ', () => shouldMatchSnapshot(<ActionBar>Hello</ActionBar>))

  it('renders correctly with custom rank', () => shouldMatchSnapshot(<ActionBar rank={2}>I am rank 2</ActionBar>))
})
