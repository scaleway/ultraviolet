'use client'

import { memo } from 'react'

import { useEstimateCost } from '../EstimateCostProvider'
import { estimateCostStyle } from '../styles.css'

import { Item } from './Item'
import { Strong } from './Strong'

import type { BareEstimateProduct, EstimateProduct, Iteration } from '../types'
import type { CSSProperties } from 'react'

type RegionProps = {
  shouldBeHidden?: boolean
  priceText?: string
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
  style?: CSSProperties
}

export const Zone = memo(
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
    style,
  }: RegionProps) => {
    const { locales } = useEstimateCost()

    return (
      <Item
        animated={animated}
        discount={discount}
        isFirstElement={isFirstElement}
        isLastElement={isLastElement}
        iteration={iteration}
        label={locales['estimate.cost.az.label']}
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
