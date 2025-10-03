'use client'

import type { CSSProperties } from 'react'
import { Block } from './Block'
import { Blocks } from './Blocks'
import { BoxWithIcon } from './BoxWithIcon'
import { Donut } from './Donut'
import { Line } from './Line'
import { List } from './List'
import { Slider } from './Slider'
import { Square } from './Square'
import { skeletonContainer, skeletonHighlight } from './styles.css'

const variants = {
  block: Block,
  blocks: Blocks,
  box: BoxWithIcon,
  donut: Donut,
  line: Line,
  list: List,
  slider: Slider,
  square: Square,
} as const

type SkeletonVariant = keyof typeof variants

type SkeletonProps = {
  variant?: SkeletonVariant
  length?: number
  col?: number
  className?: string
  'aria-label'?: string
  'data-testid'?: string
  style?: CSSProperties
}

/**
 * Skeleton component is used to indicate that the data is loading.
 * It is used to provide a better user experience by showing a temporary placeholder reflecting the dimensions of the
 * content that will eventually be loaded on the screen.
 */
export const Skeleton = ({
  variant = 'blocks',
  length,
  col,
  className,
  'aria-label': ariaLabel,
  'data-testid': dataTestId,
  style,
}: SkeletonProps) => {
  const Component = variants[variant]

  return (
    <div
      aria-busy
      aria-label={ariaLabel}
      aria-live="polite"
      className={`${className ? `${className} ` : ''}${skeletonContainer}`}
      data-testid={dataTestId}
      style={style}
    >
      <Component col={col} length={length} />

      <div className={skeletonHighlight} />
    </div>
  )
}

export const skeletonTypes = Object.keys(variants) as SkeletonVariant[]
