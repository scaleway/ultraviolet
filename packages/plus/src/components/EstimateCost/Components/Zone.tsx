import styled from '@emotion/styled'
import { useEstimateCost } from '../Providers/EstimateCostProvider'
import type { Iteration } from '../types'
import { Item } from './Item'
import { Strong } from './Strong'

const StyledImage = styled.img`
  width: 15px;
  margin-right: ${({ theme }) => theme.space['1']};
`

type RegionProps = {
  shouldBeHidden?: boolean
  priceText?: string
  animated?: boolean
  isFirstElement?: boolean
  isLastElement?: boolean
  iteration?: Iteration
  discount?: number
  label: string
  image: string
}

export const Zone = ({
  label,
  image,
  shouldBeHidden = false,
  priceText,
  animated = false,
  isFirstElement,
  isLastElement,
  iteration,
  discount,
}: RegionProps) => {
  const { locales } = useEstimateCost()

  return (
    <Item
      label={locales['estimate.cost.az.label']}
      shouldBeHidden={shouldBeHidden}
      priceText={priceText}
      animated={animated}
      isFirstElement={isFirstElement}
      isLastElement={isLastElement}
      iteration={iteration}
      discount={discount}
    >
      <Strong>
        <StyledImage alt={label} src={image} />
        {label}
      </Strong>
    </Item>
  )
}
