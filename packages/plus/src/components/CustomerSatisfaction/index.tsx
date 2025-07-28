'use client'

import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { Stack } from '@ultraviolet/ui'
import { useMemo, useState } from 'react'
import rating1 from './assets/1-5.svg'
import rating1NS from './assets/1-5NB.svg'
import rating2 from './assets/2-5.svg'
import rating2NS from './assets/2-5NB.svg'
import rating3 from './assets/3-5.svg'
import rating3NS from './assets/3-5NB.svg'
import rating4 from './assets/4-5.svg'
import rating4NS from './assets/4-5NB.svg'
import rating5 from './assets/5-5.svg'
import rating5NS from './assets/5-5NB.svg'

const ratings = [
  {
    imgNotSelected: rating1NS,
    imgSelected: rating1,
    value: 1,
  },
  {
    imgNotSelected: rating2NS,
    imgSelected: rating2,
    value: 2,
  },
  {
    imgNotSelected: rating3NS,
    imgSelected: rating3,
    value: 3,
  },
  {
    imgNotSelected: rating4NS,
    imgSelected: rating4,
    value: 4,
  },
  {
    imgNotSelected: rating5NS,
    imgSelected: rating5,
    value: 5,
  },
] as const

type Value = (typeof ratings)[number]['value']

const angryAnim = keyframes`
  from, 10%, 40%, 80%, to {
    transform: translate3d(0, 0, 0);
    transform: rotate(0deg);
  }
  30% {
    transform: translate3d(-5px, 0, 0);
    transform: rotate(5deg);
  }

  60% {
    transform: translate3d(-4px, 0, 0);
  }

  90% {
    transform: translate3d(-1px, 0, 0);
    transform: rotate(-5deg);
  }
`

const happyAnim = keyframes`
  from, 10%, 40%, 80%, to {
    transform: translate3d(0, 0, 0);
    transform: rotate(0deg);
  }
  30% {
    transform: translate3d(0, 5px, 0);
    transform: rotate(5deg);
  }

  60% {
    transform: translate3d(0, -6px, 0);
  }

  90% {
    transform: translate3d(0, -2px, 0);
  }
`

const scaled = css`
  transform: scale(1.2);
`

const Image = styled.img<{
  isSelected: boolean
  isHovered: boolean
  isHappy: boolean
}>`
  height: 88px;
  width: 88px;
  cursor: pointer;
  transition: transform 1s cubic-bezier(0.19, 1, 0.22, 1);

  &:hover,
  &:focus {
    ${scaled};
  }

  ${({ isHovered, isSelected }) => isHovered && isSelected && scaled}
  ${({ isSelected, isHappy }) =>
    isSelected &&
    css`
      animation: ${isHappy ? happyAnim : angryAnim} 1s ease infinite;
    `}
`

type CustomerSatisfactionProps = {
  value: Value
  onChange: (rating: Value) => void
  'data-testid'?: string
  className?: string
}

export const CustomerSatisfaction = ({
  value,
  onChange,
  'data-testid': dataTestId,
  className,
}: CustomerSatisfactionProps) => {
  const [hoveredValue, setHoveredValue] = useState(0)
  const isHappy = useMemo(() => value > ratings.length / 2, [value])

  return (
    <Stack
      className={className}
      data-testid={dataTestId}
      direction="row"
      justifyContent="space-between"
    >
      {ratings.map(rating => {
        const isSelected = rating.value === value
        const isHovered = rating.value === hoveredValue
        const isOverfly = rating.value <= hoveredValue

        return (
          <Image
            data-testid={`${dataTestId}-${rating.value}`}
            isHappy={isHappy}
            isHovered={isHovered}
            isSelected={isSelected}
            key={rating.value}
            onClick={() => {
              onChange(rating.value)
            }}
            onMouseEnter={() => {
              setHoveredValue(rating.value)
            }}
            onMouseLeave={() => {
              setHoveredValue(0)
            }}
            src={
              isSelected || isOverfly || rating.value <= value
                ? rating.imgSelected
                : rating.imgNotSelected
            }
          />
        )
      })}
    </Stack>
  )
}
