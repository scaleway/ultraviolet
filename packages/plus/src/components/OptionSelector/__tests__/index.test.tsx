import { shouldMatchSnapshot } from '@utils/test'
import { describe, it } from 'vitest'
import { OptionSelector } from '..'

describe('optionSelector', () => {
  it('should work with default props', () =>
    shouldMatchSnapshot(<OptionSelector />))
})
