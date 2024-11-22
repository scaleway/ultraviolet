import styled from '@emotion/styled'
import { type ComponentProps, type ReactNode, memo } from 'react'
import { useEstimateCost } from '../EstimateCostProvider'
import type { BareEstimateProduct, EstimateProduct, Iteration } from '../types'
import { Item } from './Item'
import { Strong } from './Strong'

const StyledImage = styled.img`
  width: 15px;
  margin-right: ${({ theme }) => theme.space['1']};
`

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
        label={locales['estimate.cost.region.label']}
        shouldBeHidden={shouldBeHidden}
        priceText={priceText}
        animated={animated}
        isFirstElement={isFirstElement}
        isLastElement={isLastElement}
        productsCallback={productsCallback}
        iteration={iteration}
        discount={discount}
        noBorder={noBorder}
        noPrice={noPrice}
        hideFromOverlay={hideFromOverlay}
      >
        <Strong>
          <StyledImage alt={label} src={image} />
          {label}
        </Strong>
      </Item>
    )
  },
)
