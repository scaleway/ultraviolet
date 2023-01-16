import { BorderedBox } from '..'
import { shouldMatchEmotionSnapshot } from '../../../../.jest/helpers'

describe('BorderedBox', () => {
  test('renders correctly', () => shouldMatchEmotionSnapshot(<BorderedBox />))
  test('renders correctly with children', () =>
    shouldMatchEmotionSnapshot(<BorderedBox>Hello World</BorderedBox>))
})
