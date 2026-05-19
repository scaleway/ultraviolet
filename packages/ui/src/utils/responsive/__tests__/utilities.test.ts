import { describe, expect, it } from 'vitest'
import { screens } from '../../../theme'
import type { ScreenSize } from '../../../theme'
import { down, up } from '../utilities'

describe('responsive utilities', () => {
  describe(up, () => {
    it.each(Object.keys(screens) as ScreenSize[])(`works with %s`, brk => {
      expect(up(brk, 'border: 1px solid red;')).toMatchSnapshot()
    })
    it('should return null when unknown size', () => {
      // @ts-expect-error we send the wrong screen size on purpose
      expect(up('yolo', 'border: 1px solid red;')).toMatchSnapshot()
    })
  })
  describe(down, () => {
    it.each(Object.keys(screens) as ScreenSize[])(`works with %s`, brk => {
      expect(down(brk, 'border: 1px solid red;')).toMatchSnapshot()
    })
    it('should return null when unknown size', () => {
      // @ts-expect-error we send the wrong screen size on purpose
      expect(down('yolo', 'border: 1px solid red;')).toMatchSnapshot()
    })
  })
})
