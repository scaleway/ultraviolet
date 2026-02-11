/* eslint-disable eslint-comments/disable-enable-pair */

import { describe, expect, test } from 'vitest'
import type { ScreenSize } from '../../../theme'
import { screens } from '../../../theme'
import { down, up } from '../utilities'

describe('responsive utilities', () => {
  describe(up, () => {
    ;(Object.keys(screens) as ScreenSize[]).forEach(brk => {
      test(`works with ${brk}`, () => {
        expect(up(brk, 'border: 1px solid red;')).toMatchSnapshot()
      })
    })
    test('should return null when unknown size', () => {
      // @ts-expect-error we send the wrong screen size on purpose
      expect(up('yolo', 'border: 1px solid red;')).toMatchSnapshot()
    })
  })
  describe(down, () => {
    ;(Object.keys(screens) as ScreenSize[]).forEach(brk => {
      test(`works with ${brk}`, () => {
        expect(down(brk, 'border: 1px solid red;')).toMatchSnapshot()
      })
    })
    test('should return null when unknown size', () => {
      // @ts-expect-error we send the wrong screen size on purpose
      expect(down('yolo', 'border: 1px solid red;')).toMatchSnapshot()
    })
  })
})
