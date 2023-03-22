import { Skeleton, skeletonTypes } from '..'
import { shouldMatchEmotionSnapshot } from '../../../../.jest/helpers'

describe('Skeleton', () => {
  test('renders default variant', () =>
    shouldMatchEmotionSnapshot(<Skeleton />))

  test.each(skeletonTypes)('renders correctly with type="%s"', type =>
    shouldMatchEmotionSnapshot(<Skeleton variant={type} />),
  )
})
