import { css } from '@emotion/core'
import { transparentize } from 'polished'
import PropTypes from 'prop-types'
import React, { memo } from 'react'
import flattenChildren from 'react-flatten-children'
import { theme } from '../../theme'
import { Box } from '../Box'

const styles = {
  container: css({
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    height: 48,
  }),
  base: css({
    display: 'flex',
    flex: 1,
    fontWeight: 500,
    borderRadius: 24,
    borderStyle: 'solid',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    touchAction: 'manipulation',
    outline: 'none',
  }),
  left: css({
    paddingRight: 24,
    paddingLeft: 24,
    marginRight: -24,
  }),
  middle: css({
    paddingRight: 24,
    paddingLeft: 48,
    marginLeft: -24,
    marginRight: -24,
  }),
  right: css({
    paddingRight: 24,
    paddingLeft: 48,
    marginLeft: -24,
  }),
  past: css({
    backgroundColor: theme.success,
    color: theme.white,
    borderColor: theme.white,
  }),
  clickable: css({
    cursor: 'pointer',

    ':focus': {
      boxShadow: `0 0 0 2px ${transparentize(0.75, theme.success)}`,
    },
  }),
  current: css({
    backgroundColor: theme.primary,
    color: theme.white,
    borderColor: theme.white,

    ':focus': {
      boxShadow: `0 0 0 2px ${transparentize(0.75, theme.primary)}`,
    },
  }),
  future: css({
    backgroundColor: theme.white,
    color: theme.gray550,
    borderColor: theme.gray350,

    ':focus': {
      boxShadow: `0 0 0 2px ${transparentize(0.75, theme.gray550)}`,
    },
  }),
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
        const isLeft = index === 0
        const isRight = index === length - 1
        const isPast = selected > index
        const isClickable = isPast && Boolean(onClick)
        const isCurrent = selected === index

        return (
          <Box
            key={`step-${index}`}
            onClick={isClickable ? () => onClick(index) : undefined}
            as={isClickable ? 'button' : 'div'}
            css={[
              styles.base,
              css({ zIndex: length - index }),
              isLeft ? styles.left : isRight ? styles.right : styles.middle,
              isClickable && styles.clickable,
              isPast ? styles.past : isCurrent ? styles.current : styles.future,
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
