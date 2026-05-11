import { getUUID } from '@ultraviolet/utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

describe('ids', () => {
  describe(getUUID, () => {
    beforeEach(() => {
      vi.spyOn(globalThis.Math, 'random').mockReturnValue(0.415_591_366_944_480_4)
    })

    afterEach(() => {
      vi.spyOn(globalThis.Math, 'random').mockRestore()
    })

    it('returns correctly without arguments', () => {
      expect(getUUID()).toMatchSnapshot()
    })

    it('returns correctly with a prefix', () => {
      expect(getUUID('ah')).toMatchSnapshot()
    })
  })
})
