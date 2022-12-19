import Image from '..'
import { shouldMatchEmotionSnapshot } from '../../../../.jest/helpers'

describe('Image', () => {
  test(`render correctly`, () =>
    shouldMatchEmotionSnapshot(<Image src="//toto.png" alt="" />))
})
