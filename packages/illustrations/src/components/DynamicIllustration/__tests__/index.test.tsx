import { describe, it } from '@jest/globals'
import { DynamicIllustration } from '..'
import {
  shouldMatchEmotionSnapshotDark,
  shouldMatchEmotionSnapshotLight,
} from '../../../../.jest/helpers'

describe('DynamicIllustration', () => {
  it('should work with light theme', () =>
    shouldMatchEmotionSnapshotLight(<DynamicIllustration name="empty" />))

  it('should work with dark theme', () =>
    shouldMatchEmotionSnapshotDark(<DynamicIllustration name="empty" />))
})
