import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import {
  AiCategoryIcon,
  BaremetalCategoryIcon,
  BillingCategoryIcon,
  ComputeCategoryIcon,
  ContainersCategoryIcon,
  DataAndAnalyticsCategoryIcon,
  DatabaseCategoryIcon,
  DatacenterCategoryIcon,
  DocumentationCategoryIcon,
  PartnersCategoryIcon,
} from '..'

describe('categoryIcons', () => {
  const categoryIcons = [
    AiCategoryIcon,
    BaremetalCategoryIcon,
    BillingCategoryIcon,
    ComputeCategoryIcon,
    ContainersCategoryIcon,
    DataAndAnalyticsCategoryIcon,
    DatabaseCategoryIcon,
    DatacenterCategoryIcon,
    DocumentationCategoryIcon,
    PartnersCategoryIcon,
  ]

  categoryIcons.forEach(CategoryIconComponent => {
    const categoryName = CategoryIconComponent.name

    describe(categoryName, () => {
      it(`renders ${categoryName} correctly`, () => {
        const { asFragment } = render(<CategoryIconComponent />)
        expect(asFragment()).toMatchSnapshot()
      })

      it(`renders ${categoryName} with disabled state`, () => {
        const { asFragment } = render(<CategoryIconComponent disabled />)
        expect(asFragment()).toMatchSnapshot()
      })

      it(`renders ${categoryName} with custom className`, () => {
        const { asFragment } = render(<CategoryIconComponent className="custom-class" />)
        expect(asFragment()).toMatchSnapshot()
      })

      it(`renders ${categoryName} with custom aria-label`, () => {
        const { asFragment } = render(<CategoryIconComponent aria-label="Custom label" />)
        expect(asFragment()).toMatchSnapshot()
      })

      it(`renders ${categoryName} with hidden aria`, () => {
        const { asFragment } = render(<CategoryIconComponent aria-hidden />)
        expect(asFragment()).toMatchSnapshot()
      })

      it(`renders ${categoryName} with custom data-testid`, () => {
        const { asFragment } = render(<CategoryIconComponent data-testid="custom-test-id" />)
        expect(asFragment()).toMatchSnapshot()
      })

      it(`renders ${categoryName} with custom style`, () => {
        const { asFragment } = render(<CategoryIconComponent style={{ color: 'red', cursor: 'pointer' }} />)
        expect(asFragment()).toMatchSnapshot()
      })
    })
  })
})
