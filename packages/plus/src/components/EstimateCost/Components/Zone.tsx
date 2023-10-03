import styled from '@emotion/styled'
import { useEstimateCost } from '../EstimateCostProvider'
import { getFlag, getLabel } from '../locations'
import type {
  BareEstimateProduct,
  EstimateProduct,
  Iteration,
  Zone as ZoneType,
} from '../types'
import { Item } from './Item'
import { Strong } from './Strong'

const StyledImage = styled.img`
  width: 15px;
  margin-right: ${({ theme }) => theme.space['1']};
`

type RegionProps = {
  zone: ZoneType
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
}

export const Zone = ({
  zone,
  shouldBeHidden = false,
  priceText,
  animated = false,
  isFirstElement,
  isLastElement,
  productsCallback,
  iteration,
  discount,
}: RegionProps) => {
  const { locales } = useEstimateCost()
  const zoneLabel = getLabel({ location: zone })
  const image = getFlag({ location: zone })

  return (
    <Item
      label={locales['estimate.cost.az.label']}
      shouldBeHidden={shouldBeHidden}
      priceText={priceText}
      animated={animated}
      isFirstElement={isFirstElement}
      isLastElement={isLastElement}
      productsCallback={productsCallback}
      iteration={iteration}
      discount={discount}
    >
      <Strong>
        <StyledImage alt={zoneLabel} src={image} />
        {zoneLabel}
      </Strong>
    </Item>
  )
}
