'use client'

import { Stack } from '@ultraviolet/ui'
import type { CSSProperties } from 'react'
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
import {
  customerSatisfactionButtonContainer,
  customerStatisfaction,
} from './styles.css'

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

type CustomerSatisfactionProps = {
  value: Value
  onChange: (rating: Value) => void
  'data-testid'?: string
  className?: string
  style?: CSSProperties
}

export const CustomerSatisfaction = ({
  value,
  onChange,
  'data-testid': dataTestId,
  className,
  style,
}: CustomerSatisfactionProps) => {
  const [hoveredValue, setHoveredValue] = useState(0)
  const isHappy = useMemo(() => value > ratings.length / 2, [value])

  return (
    <Stack
      className={className}
      data-testid={dataTestId}
      direction="row"
      justifyContent="space-between"
      style={style}
    >
      {ratings.map(rating => {
        const isSelected = rating.value === value
        const isOverfly = rating.value <= hoveredValue
        const isScaled = rating.value === hoveredValue && isSelected
        const animated = isHappy ? 'happy' : 'angry'

        return (
          <button
            className={customerSatisfactionButtonContainer}
            key={rating.value}
            onClick={() => {
              onChange(rating.value)
            }}
            onKeyDown={() => {}}
            onMouseEnter={() => {
              setHoveredValue(rating.value)
            }}
            onMouseLeave={() => {
              setHoveredValue(0)
            }}
            type="button"
          >
            <img
              alt="rating"
              className={customerStatisfaction({
                animated: isSelected ? animated : undefined,
                isScaled,
              })}
              data-testid={`${dataTestId}-${rating.value}`}
              height="auto"
              src={
                isSelected || isOverfly || rating.value <= value
                  ? rating.imgSelected
                  : rating.imgNotSelected
              }
              width="auto"
            />
          </button>
        )
      })}
    </Stack>
  )
}
