'use client'

import type { ComponentProps, ReactNode } from 'react'
import { memo } from 'react'
import { useEstimateCost } from '../EstimateCostProvider'
import { estimateCostImage } from '../styles.css'
import type { BareEstimateProduct, EstimateProduct, Iteration } from '../types'
import { Item } from './Item'
import { Strong } from './Strong'

type RegionProps = {
  shouldBeHidden?: boolean
  priceText?: ReactNode
  animated?: boolean
  isFirstElement?: boolean
  isLastElement?: boolean
  productsCallback?: {
    add: (product: EstimateProduct) => void
    remove: (product: BareEstimateProduct) => void
  }
  iteration?: Iteration
  discount?: number
  label: string
  image: string
  noBorder?: boolean
  noPrice?: boolean
} & Pick<ComponentProps<typeof Item>, 'hideFromOverlay'>

export const Region = memo(
  ({
    label,
    image,
    shouldBeHidden = false,
    priceText,
    animated = false,
    isFirstElement,
    isLastElement,
    productsCallback,
    iteration,
    discount,
    noBorder,
    noPrice,
    hideFromOverlay,
  }: RegionProps) => {
    const { locales } = useEstimateCost()

    return (
      <Item
        animated={animated}
        discount={discount}
        hideFromOverlay={hideFromOverlay}
        isFirstElement={isFirstElement}
        isLastElement={isLastElement}
        iteration={iteration}
        label={locales['estimate.cost.region.label']}
        noBorder={noBorder}
        noPrice={noPrice}
        priceText={priceText}
        productsCallback={productsCallback}
        shouldBeHidden={shouldBeHidden}
      >
        <Strong>
          <img alt={label} className={estimateCostImage} src={image} />
          {label}
        </Strong>
      </Item>
    )
  },
)
