import Bullet, { bulletSizes, bulletVariants } from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

describe('Bullet', () => {
  test('renders correctly with a text', () =>
    shouldMatchEmotionSnapshot(<Bullet text="1" />))

  test('renders correctly with an icon', () =>
    shouldMatchEmotionSnapshot(<Bullet icon="ai" />))

  describe('variant', () => {
    bulletVariants.forEach(variant => {
      test(`render ${variant}`, () =>
        shouldMatchEmotionSnapshot(<Bullet variant={variant} text="1" />))
    })
  })

  describe('size', () => {
    bulletSizes.forEach(size => {
      test(`render ${size}`, () =>
        shouldMatchEmotionSnapshot(<Bullet size={size} text="1" />))
    })
  })
})
