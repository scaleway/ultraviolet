import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
<<<<<<< HEAD
import React from 'react'
import Box, { BoxProps } from '../Box'
=======
import * as React from 'react'
import Box from '../Box'
>>>>>>> chore(react):react17 new jsx transform
import Block from './Block'
import Blocks from './Blocks'
import BoxWithIcon from './BoxWithIcon'
import Donut from './Donut'
import Line from './Line'
import List from './List'
import Slider from './Slider'

const shineAnimation = keyframes`
  from {
    left: -25%;
  }
  to {
    left: 100%;
  }
`

const StyledContainer = styled(Box)`
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
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0.4),
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0)
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

type PlaceholderVariant = keyof typeof variants

type PlaceholderProps = {
  variant?: PlaceholderVariant
  length?: number
  col?: number
} & BoxProps

const Placeholder = ({
  variant = 'blocks',
  length,
  col,
  ...props
}: PlaceholderProps) => {
  const Component = variants[variant]

  return (
    <StyledContainer {...props}>
      <Component length={length} col={col} />

      <StyledDiv />
    </StyledContainer>
  )
}

export const placeholderTypes = Object.keys(variants) as PlaceholderVariant[]

Placeholder.propTypes = {
  col: PropTypes.number,
  length: PropTypes.number,
  variant: PropTypes.oneOf(placeholderTypes),
}

export default Placeholder
