import { getUUID } from '@ultraviolet/utils'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

describe('ids', () => {
  describe(getUUID, () => {
    beforeEach(() => {
      vi.spyOn(globalThis.Math, 'random').mockReturnValue(
        0.415_591_366_944_480_4,
      )
    })

    afterEach(() => {
      vi.spyOn(globalThis.Math, 'random').mockRestore()
    })

    test('returns correctly without arguments', () => {
      expect(getUUID()).toMatchSnapshot()
    })

    test('returns correctly with a prefix', () => {
      expect(getUUID('ah')).toMatchSnapshot()
    })
  })
})
