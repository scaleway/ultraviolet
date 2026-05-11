import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import {
  AbuseProductIcon,
  AccountExperienceProductIcon,
  AdditionalDiskProductIcon,
  AdvancedSettingsProductIcon,
  AdvancedSupportProductIcon,
  AnnotationsProductIcon,
  AnsibleProductIcon,
  ApiGatewayProductIcon,
  ApiKeyProductIcon,
  ApiProductIcon,
} from '..'
import type { IconProps } from '../Icon'

describe('productIcons', () => {
  const productIcons = [
    AbuseProductIcon,
    AccountExperienceProductIcon,
    AdditionalDiskProductIcon,
    AdvancedSettingsProductIcon,
    AdvancedSupportProductIcon,
    AnnotationsProductIcon,
    AnsibleProductIcon,
    ApiGatewayProductIcon,
    ApiKeyProductIcon,
    ApiProductIcon,
  ]

  productIcons.forEach(ProductIconComponent => {
    const productName = ProductIconComponent.name

    describe(productName, () => {
      it(`renders ${productName} correctly`, () => {
        const { asFragment } = render(<ProductIconComponent />)
        expect(asFragment()).toMatchSnapshot()
      })

      it(`renders ${productName} with custom size`, () => {
        const sizes: IconProps['size'][] = ['xsmall', 'small', 'medium', 'large', 'xlarge']

        sizes.forEach(size => {
          const { asFragment } = render(<ProductIconComponent size={size} />)
          expect(asFragment()).toMatchSnapshot()
        })
      })

      it(`renders ${productName} with custom variant`, () => {
        const variants: IconProps['variant'][] = ['primary', 'danger', 'warning', 'original']

        variants.forEach(variant => {
          const { asFragment } = render(<ProductIconComponent variant={variant} />)
          expect(asFragment()).toMatchSnapshot()
        })
      })

      it(`renders ${productName} with disabled state`, () => {
        const { asFragment } = render(<ProductIconComponent disabled />)
        expect(asFragment()).toMatchSnapshot()
      })

      it(`renders ${productName} with custom className`, () => {
        const { asFragment } = render(<ProductIconComponent className="custom-class" />)
        expect(asFragment()).toMatchSnapshot()
      })

      it(`renders ${productName} with custom style`, () => {
        const { asFragment } = render(<ProductIconComponent style={{ color: 'red', cursor: 'pointer' }} />)
        expect(asFragment()).toMatchSnapshot()
      })
    })
  })
})
