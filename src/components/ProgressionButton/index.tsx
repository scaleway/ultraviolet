import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { transparentize } from 'polished'
import PropTypes from 'prop-types'
import React, { FunctionComponent, ReactNode } from 'react'
import { Color } from '../../theme/colors'
import Box from '../Box'

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
  ${({ theme }) => `
  background: repeating-linear-gradient(
    45deg,
    ${theme.colors.gray550},
    ${theme.colors.gray550} 10px,
    ${transparentize(0.25, theme.colors.gray550)} 10px,
    ${transparentize(0.25, theme.colors.gray550)} 30px
  );`}

  overflow: hidden;
  border-radius: 4px;

  &:before {
    content: '';
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }
`

interface ProgressionProps {
  duration: number
  delay: number
  color: string
}

const Progression = styled.div<ProgressionProps>`
  background-color: ${({ theme, color }) =>
    theme.colors[color as Color] ?? color};
  position: absolute;
  z-index: -1;
  top: 0;
  bottom: 0;
  left: 0;
  animation: ${progressionAnimation}
    ${({ duration, delay }) => `${duration}s linear ${-delay}s`} forwards;
`

export type ProgressionButtonProps = Partial<
  Omit<ProgressionProps, 'delay'>
> & {
  children: ReactNode
  color?: string
  creation?: string | Date
  duration?: number
}

const ProgressionButton: FunctionComponent<ProgressionButtonProps> = ({
  children,
  color = 'green',
  creation = new Date(), // Supposed start time of the progression
  duration = 120, // Approximation of the progression's duration (in seconds)
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

ProgressionButton.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  /**
   * Indicates the starting time of the progression.
   */
  creation: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
  /**
   * Indicates an approximation of the progression duration in seconds.
   */
  duration: PropTypes.number,
}

export default ProgressionButton
