import { css, keyframes } from '@emotion/react'
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

const style = css`
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
`

const types = {
  block: Block,
  blocks: Blocks,
  box: BoxWithIcon,
  donut: Donut,
  line: Line,
  list: List,
  slider: Slider,
}

const Placeholder = ({ type, length, width, height, col, ...props }) => {
  const Component = types[type]

  return (
    <Box
      position="relative"
      display="block"
      width="100%"
      overflow="hidden"
      {...props}
    >
      <Component length={length} width={width} height={height} col={col} />

      <div css={style} />
    </Box>
  )
}

export const placeholderTypes = Object.keys(types)

Placeholder.propTypes = {
  col: PropTypes.number,
  height: PropTypes.number,
  length: PropTypes.number,
  type: PropTypes.oneOf(placeholderTypes),
  width: PropTypes.number,
}

Placeholder.defaultProps = {
  col: undefined,
  height: undefined,
  length: undefined,
  type: 'blocks',
  width: undefined,
}

export default Placeholder
