import { css } from '@emotion/react'
import { transparentize } from 'polished'
import PropTypes from 'prop-types'
import React, { memo } from 'react'
import flattenChildren from 'react-flatten-children'
import { colors } from '../../theme'
import { Box } from '../Box'

const styles = {
  container: css`
    width: 100%;
    display: flex;
    flex-direction: row;
    height: 48px;
  `,
  base: css`
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
  `,
  left: css`
    padding-right: 24px;
    padding-left: 24px;
    margin-right: -24px;
  `,
  middle: css`
    padding-right: 24px;
    padding-left: 48px;
    margin-left: -24px;
    margin-right: -24px;
  `,
  right: css`
    padding-right: 24px;
    padding-left: 48px;
    margin-left: -24px;
  `,
  past: css`
    background-color: ${colors.success};
    color: ${colors.white};
    border-color: ${colors.white};
  `,
  clickable: css`
    cursor: pointer;

    &:focus {
      box-shadow: 0 0 0 2px ${transparentize(0.75, colors.success)};
    }
  `,
  current: css`
    background-color: ${colors.primary};
    color: ${colors.white};
    border-color: ${colors.white};

    &:focus {
      box-shadow: 0 0 0 2px ${transparentize(0.75, colors.primary)};
    }
  `,
  future: css`
    background-color: ${colors.white};
    color: ${colors.gray550};
    border-color: ${colors.gray350};

    &:focus {
      box-shadow: 0 0 0 2px ${transparentize(0.75, colors.gray550)};
    }
  `,
}

const Step = () => null

function Progress({ children, selected, ...props }) {
  const flatChildren = flattenChildren(children)
  const { length } = flatChildren

  return (
    <Box css={styles.container} {...props}>
      {flatChildren.map((child, index) => {
        if (!child) {
          return null
        }

        const { onClick, title } = child.props
        const isPast = selected > index
        const isClickable = isPast && Boolean(onClick)

        const isLeftOrRightStyles = () => {
          if (index === 0) return styles.left
          if (index === length - 1) return styles.right

          return styles.middle
        }

        const isPastOrCurrentStyles = () => {
          if (selected > index) return styles.past
          if (selected === index) return styles.current

          return styles.future
        }

        return (
          <Box
            key={`step-${index}`}
            onClick={isClickable ? () => onClick(index) : undefined}
            as={isClickable ? 'button' : 'div'}
            css={[
              styles.base,
              css`
                z-index: ${length - index};
              `,
              isLeftOrRightStyles(),
              isClickable && styles.clickable,
              isPastOrCurrentStyles(),
            ]}
          >
            {title}
          </Box>
        )
      })}
    </Box>
  )
}

Progress.propTypes = {
  selected: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
}

const MemoProgress = memo(Progress)

MemoProgress.Step = Step

export { MemoProgress as Progress }
