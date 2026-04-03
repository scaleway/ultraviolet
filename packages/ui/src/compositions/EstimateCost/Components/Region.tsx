'use client'

import { memo } from 'react'

import { useEstimateCost } from '../EstimateCostProvider'
import { estimateCostStyle } from '../styles.css'

import { Item } from './Item'
import { Strong } from './Strong'

import type { BareEstimateProduct, EstimateProduct, Iteration } from '../types'
import type { ComponentProps, ReactNode } from 'react'

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
} & Pick<ComponentProps<typeof Item>, 'hideFromOverlay' | 'style'>

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
    style,
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
        style={style}
      >
        <Strong>
          <img
            alt={label}
            className={estimateCostStyle.image}
            height="auto"
            src={image}
            width="auto"
          />
          {label}
        </Strong>
      </Item>
    )
  },
)
