import { breakpoints } from '../../../theme'
import { down, up } from '../utilities'

describe('Responsive utilities', () => {
  describe('up', () => {
    Object.keys(breakpoints).forEach(brk => {
      test(`works with ${brk}`, () => {
        expect(up(brk, 'border: 1px solid red;')).toMatchSnapshot()
      })
    })
    test('should return null when unknown size', () => {
      expect(up('yolo', 'border: 1px solid red;')).toMatchSnapshot()
    })
  })
  describe('down', () => {
    Object.keys(breakpoints).forEach(brk => {
      test(`works with ${brk}`, () => {
        expect(down(brk, 'border: 1px solid red;')).toMatchSnapshot()
      })
    })
    test('should return null when unknown size', () => {
      expect(down('yolo', 'border: 1px solid red;')).toMatchSnapshot()
    })
  })
})
