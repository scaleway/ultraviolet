import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { Block } from './Block'
import { Blocks } from './Blocks'
import { BoxWithIcon } from './BoxWithIcon'
import { Donut } from './Donut'
import { Line } from './Line'
import { List } from './List'
import { Slider } from './Slider'

const shineAnimation = keyframes`
  from {
    left: -25%;
  }
  to {
    left: 100%;
  }
`

const StyledContainer = styled.div`
  position: relative;
  display: block;
  width: 100%;
  overflow: hidden;
  cursor: progress;
`

const StyledDiv = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 25%;
  opacity: 0.8;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.neutral.backgroundWeak}00,
    ${({ theme }) => theme.colors.neutral.backgroundWeak}4D,
    ${({ theme }) => theme.colors.neutral.backgroundWeak}66,
    ${({ theme }) => theme.colors.neutral.backgroundWeak}4D,
    ${({ theme }) => theme.colors.neutral.backgroundWeak}00
  );
  animation: ${shineAnimation} 1s linear infinite;
  animation-direction: alternate;

  @media (prefers-reduced-motion: reduce) {
    animation: unset;
  }
`

export const variants = {
  block: Block,
  blocks: Blocks,
  box: BoxWithIcon,
  donut: Donut,
  line: Line,
  list: List,
  slider: Slider,
} as const

type SkeletonVariant = keyof typeof variants

type SkeletonProps = {
  variant?: SkeletonVariant
  length?: number
  col?: number
  className?: string
}

export const Skeleton = ({
  variant = 'blocks',
  length,
  col,
  className,
}: SkeletonProps) => {
  const Component = variants[variant]

  return (
    <StyledContainer className={className}>
      <Component length={length} col={col} />

      <StyledDiv />
    </StyledContainer>
  )
}

export const skeletonTypes = Object.keys(variants) as SkeletonVariant[]
