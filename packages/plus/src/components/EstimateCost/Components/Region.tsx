import styled from '@emotion/styled'
import { Text } from '@ultraviolet/ui'
import type { ReactNode } from 'react'
import { useEstimateCost } from '../EstimateCostProvider'
import { getFlag, getLabel } from '../locations'
import type {
  BareEstimateProduct,
  EstimateProduct,
  Iteration,
  Region as RegionType,
  Zone as ZoneType,
} from '../types'
import { Item } from './Item'
import { Strong } from './Strong'

const StyledImage = styled.img`
  width: 15px;
  margin-right: ${({ theme }) => theme.space['1']};
`

type RegionProps = {
  region: RegionType
  zone?: ZoneType
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
}

export const Region = ({
  region,
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
  const label = getLabel({ location: region })
  const zoneLabel = zone ? getLabel({ location: zone, short: true }) : undefined
  const image = getFlag({ location: region })

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
    >
      <Strong>
        <StyledImage alt={label} src={image} />
        {label}
        {zoneLabel ? (
          <Text as="p" variant="body">
            &nbsp;-&nbsp;{zoneLabel}
          </Text>
        ) : null}
      </Strong>
    </Item>
  )
}
