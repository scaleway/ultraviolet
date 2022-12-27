import { getUUID } from '../ids'

describe('ids', () => {
  describe('getUUID', () => {
    test('returns correctly without arguments', () => {
      expect(getUUID()).toMatchSnapshot()
    })

    test('returns correctly with a prefix', () => {
      expect(getUUID('ah')).toMatchSnapshot()
    })
  })
})
