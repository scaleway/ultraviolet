import { describe, it } from '@jest/globals'
import { CategoryIcon } from '..'
import { shouldMatchEmotionSnapshotWithPortal } from '../../../../.jest/helpers'
import { CATEGORY_ICONS } from '../Icons'

describe('CategoryIcon', () => {
  describe('should work with all names', () => {
    Object.keys(CATEGORY_ICONS).forEach(iconName => {
      it(`should work with ${iconName}`, () =>
        shouldMatchEmotionSnapshotWithPortal(<CategoryIcon name="console" />))
    })
  })
})
