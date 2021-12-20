import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'
import Box from '../Box'
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
  width?: number
  height?: number
  col?: number
}

const Placeholder: React.VoidFunctionComponent<PlaceholderProps> = ({
  variant = 'blocks',
  length,
  width,
  height,
  col,
  ...props
}) => {
  const Component = variants[variant]

  return (
    <StyledContainer {...props}>
      <Component length={length} width={width} height={height} col={col} />

      <StyledDiv />
    </StyledContainer>
  )
}

export const placeholderTypes = Object.keys(variants) as PlaceholderVariant[]

Placeholder.propTypes = {
  col: PropTypes.number,
  height: PropTypes.number,
  length: PropTypes.number,
  variant: PropTypes.oneOf(placeholderTypes),
  width: PropTypes.number,
}

Placeholder.defaultProps = {
  col: undefined,
  height: undefined,
  length: undefined,
  variant: 'blocks',
  width: undefined,
}

export default Placeholder
