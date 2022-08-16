import { shouldMatchEmotionSnapshot } from '../../helpers/jestHelpers'
import capitalize from '../capitalize'
import { getUUID, useUUID } from '../ids'

const Component = ({ prefix }: { prefix?: string } = {}) => (
  <>{useUUID(prefix)}</>
)

describe('ids', () => {
  describe('getUUID', () => {
    test('returns correctly without arguments', () => {
      expect(getUUID()).toMatchSnapshot()
    })

    test('returns correctly with a prefix', () => {
      expect(getUUID('ah')).toMatchSnapshot()
    })
  })

  describe('useUUID', () => {
    test('renders correctly without arguments', () =>
      shouldMatchEmotionSnapshot(<Component />))

    test('renders correctly with a prefix', () =>
      shouldMatchEmotionSnapshot(<Component prefix="ah" />))
  })

  describe('capitalize', () => {
    test('returns correctly without arguments', () => {
      expect(capitalize('test')).toBe('Test')
    })
  })
})
