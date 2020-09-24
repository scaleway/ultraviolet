import { css } from '@emotion/core'
import React from 'react'
import { Box } from './Box'

const styles = {
  root: css({
    border: 0,
    transitionProperty: 'opacity',
    transitionDuration: '0.15s',
    userSelect: 'none',
    backgroundColor: 'transparent',
    padding: 0,
    margin: 0,
  }),
  actionable: css({
    cursor: 'pointer',
    touchAction: 'manipulation',
  }),
  disabled: css({
    opacity: 0.5,
  }),
}

const Touchable = ({
  innerRef,
  disabled,
  activeOpacity,
  hasFocus,
  as = 'button',
  type,
  ...props
}) => (
  <Box
    ref={innerRef}
    css={[
      styles.root,
      !disabled && styles.actionable,
      !disabled &&
        css({
          ':active': { opacity: activeOpacity },
        }),
      disabled && styles.disabled,
    ]}
    {...props}
    as={as}
    type={as === 'button' ? 'button' : type}
    disabled={disabled}
    tabIndex={hasFocus ? 0 : null}
  />
)

const forwardRef = (props, ref) => <Touchable {...props} innerRef={ref} />
const ForwardRef = React.forwardRef(forwardRef)
ForwardRef.displayName = 'fwd(Touchable)'

export {
  ForwardRef as Touchable,
}
