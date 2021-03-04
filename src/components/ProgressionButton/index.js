import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { transparentize } from 'polished'
import PropTypes from 'prop-types'
import React from 'react'
import { colors } from '../../theme'
import { Box } from '../Box'

const progressionAnimation = keyframes`
  from {
    width: 0%;
  }

  to {
    width: 100%;
  }
`

const ProgressionContainer = styled(Box)`
  position: relative;
  text-align: center;
  color: white;
  font-weight: 500;
  z-index: 0;
  background: repeating-linear-gradient(
    45deg,
    ${colors.gray550},
    ${colors.gray550} 10px,
    ${transparentize(0.25, colors.gray550)} 10px,
    ${transparentize(0.25, colors.gray550)} 30px
  );
  overflow: hidden;
  border-radius: 4px;

  &:before {
    content: '';
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }
`

const Progression = styled.div`
  background-color: ${({ color }) => colors[color]};
  position: absolute;
  z-index: -1;
  top: 0;
  bottom: 0;
  left: 0;
  animation: ${progressionAnimation}
    ${({ duration, delay }) => `${duration}s linear ${-delay}s`} forwards;
`

const ProgressionButton = ({
  children,
  color,
  creation, // Supposed start time of the progression
  duration, // Approximation of the progression's duration (in seconds)
  ...props
}) => {
  const createdAt = typeof creation === 'string' ? new Date(creation) : creation
  const delay = Math.floor((Date.now() - createdAt.getTime()) / 1000)

  return (
    <ProgressionContainer role="progressbar" {...props}>
      <Progression color={color} delay={delay} duration={duration} />
      {children}
    </ProgressionContainer>
  )
}

ProgressionButton.defaultProps = {
  color: 'green',
  creation: new Date(),
  duration: 120,
}

ProgressionButton.propTypes = {
  color: PropTypes.string,
  creation: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
  duration: PropTypes.number,
  children: PropTypes.node.isRequired,
}

export { ProgressionButton }
