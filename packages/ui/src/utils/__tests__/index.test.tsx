import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { getUUID } from '../ids'

describe('ids', () => {
  describe('getUUID', () => {
    beforeEach(() => {
      vi.spyOn(globalThis.Math, 'random').mockReturnValue(0.4155913669444804)
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
