import { describe, it } from '@jest/globals'
import { ProductIcon } from '..'
import { shouldMatchEmotionSnapshotWithPortal } from '../../../../.jest/helpers'
import { PRODUCT_ICONS } from '../Icons'

describe('ProductIcon', () => {
  describe('should work with all names', () => {
    Object.keys(PRODUCT_ICONS).forEach(iconName => {
      it(`should work with ${iconName}`, () =>
        shouldMatchEmotionSnapshotWithPortal(<ProductIcon name="console" />))
    })
  })

  it('should work with disabled', () =>
    shouldMatchEmotionSnapshotWithPortal(
      <ProductIcon name="console" disabled />,
    ))

  describe('should work with all sizes', () => {
    ;(['small', 'medium', 'large', 'xlarge'] as const).forEach(size => {
      it(`should work with ${size}`, () =>
        shouldMatchEmotionSnapshotWithPortal(
          <ProductIcon name="console" size={size} />,
        ))
    })
  })

  describe('should work with all variants', () => {
    ;(['primary', 'danger', 'warning'] as const).forEach(variant => {
      it(`should work with ${variant}`, () =>
        shouldMatchEmotionSnapshotWithPortal(
          <ProductIcon name="console" variant={variant} />,
        ))
    })
  })
})
