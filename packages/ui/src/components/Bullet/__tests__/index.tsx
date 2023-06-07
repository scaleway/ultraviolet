import { Bullet, bulletSentiments, bulletSizes } from '..'
import { shouldMatchEmotionSnapshot } from '../../../../.jest/helpers'

describe('Bullet', () => {
  test('renders correctly with a text', () =>
    shouldMatchEmotionSnapshot(<Bullet text="1" />))

  test('renders correctly with an icon', () =>
    shouldMatchEmotionSnapshot(<Bullet icon="moon" />))

  describe('sentiment', () => {
    bulletSentiments.forEach(sentiment => {
      test(`render ${sentiment}`, () =>
        shouldMatchEmotionSnapshot(<Bullet sentiment={sentiment} text="1" />))
    })
  })

  describe('size', () => {
    bulletSizes.forEach(size => {
      test(`render ${size}`, () =>
        shouldMatchEmotionSnapshot(<Bullet size={size} text="1" />))
    })
  })
})
