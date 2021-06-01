import styled from '@emotion/styled'
import { transparentize } from 'polished'
import PropTypes from 'prop-types'
import React, { memo } from 'react'
import flattenChildren from 'react-flatten-children'
import Box from '../Box'

const clickableStyles = ({ theme }) => `
  cursor: pointer;

  &:focus {
    box-shadow: 0 0 0 2px ${transparentize(0.75, theme.colors.success)};
  }
`

const positions = {
  left: `
    padding-right: 24px;
    padding-left: 24px;
    margin-right: -24px;
  `,
  middle: `
    padding-right: 24px;
    padding-left: 48px;
    margin-left: -24px;
    margin-right: -24px;
  `,
  right: `
    padding-right: 24px;
    padding-left: 48px;
    margin-left: -24px;
  `,
}

const temporals = {
  current: ({ theme }) => `
    background-color: ${theme.colors.primary};
    color: ${theme.colors.white};
    border-color: ${theme.colors.white};

    &:focus {
      box-shadow: 0 0 0 2px ${transparentize(0.75, theme.colors.primary)};
    }
  `,
  future: ({ theme }) => `
    background-color: ${theme.colors.white};
    color: ${theme.colors.gray550};
    border-color: ${theme.colors.gray350};

    &:focus {
      box-shadow: 0 0 0 2px ${transparentize(0.75, theme.colors.gray550)};
    }
  `,
  past: ({ theme }) => `
    background-color: ${theme.colors.success};
    color: ${theme.colors.white};
    border-color: ${theme.colors.white};
  `,
}

const positionStyles = ({ position }) => positions[position] ?? undefined

const temporalStyles = ({ temporal }) => temporals[temporal]

const StyledContainer = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: row;
  height: 48px;
`

const StyledStep = styled(Box, {
  shouldForwardProp: prop =>
    !['clickable', 'temporal', 'position'].includes(prop),
})`
  display: flex;
  flex: 1;
  font-weight: 500;
  border-radius: 24px;
  border-style: solid;
  border-width: 1px;
  align-items: center;
  justify-content: center;
  text-align: center;
  touch-action: manipulation;
  outline: none;

  ${positionStyles}
  ${temporalStyles}
  ${({ clickable }) => clickable && clickableStyles}
`

export const Step = () => null

const Progress = ({ children, selected, ...props }) => {
  const flatChildren = flattenChildren(children)
  const { length } = flatChildren

  return (
    <StyledContainer {...props}>
      {flatChildren.map((child, index) => {
        if (!child) {
          return null
        }

        const { onClick, title } = child.props
        const isPast = selected > index
        const isClickable = isPast && Boolean(onClick)

        const getPosition = () => {
          if (index === 0) return 'left'
          if (index === length - 1) return 'right'

          return 'middle'
        }

        const getTemporal = () => {
          if (selected > index) return 'past'
          if (selected === index) return 'current'

          return 'future'
        }

        return (
          <StyledStep
            key={`step-${title}`}
            onClick={isClickable ? () => onClick(index) : undefined}
            as={isClickable ? 'button' : 'div'}
            zIndex={length - index}
            position={getPosition()}
            temporal={getTemporal()}
            clickable={isClickable}
          >
            {title}
          </StyledStep>
        )
      })}
    </StyledContainer>
  )
}

Progress.propTypes = {
  children: PropTypes.node.isRequired,
  selected: PropTypes.number.isRequired,
}

const MemoProgress = memo(Progress)

MemoProgress.Step = Step

Step.propTypes = {
  /**
   * Test code export
   */
  title: PropTypes.string,
}

Step.defaultProps = {
  title: '',
}

export default MemoProgress
