import { css } from '@emotion/react'
import PropTypes from 'prop-types'
import React from 'react'
import { Box } from '../Box'

const styles = {
  root: css`
    border: 0;
    transition-property: opacity;
    transition-duration: 0.15s;
    user-select: none;
    background-color: transparent;
    padding: 0;
    margin: 0;
  `,
  actionable: css`
    cursor: pointer;
    touch-action: manipulation;
  `,
  disabled: css`
    opacity: 0.5;
  `,
}

const Touchable = ({
  innerRef,
  disabled,
  activeOpacity,
  hasFocus,
  as,
  type,
  ...props
}) => (
  <Box
    ref={innerRef}
    css={[
      styles.root,
      !disabled && styles.actionable,
      !disabled &&
        css`
          &:active {
            opacity: ${activeOpacity};
          }
        `,
      disabled && styles.disabled,
    ]}
    {...props}
    as={as}
    type={as === 'button' ? 'button' : type}
    disabled={disabled}
    tabIndex={hasFocus ? 0 : undefined}
  />
)

Touchable.propTypes = {
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({})]),
  disabled: PropTypes.bool,
  activeOpacity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  hasFocus: PropTypes.bool,
  as: PropTypes.string,
  type: PropTypes.string,
}

Touchable.defaultProps = {
  innerRef: null,
  disabled: false,
  activeOpacity: null,
  hasFocus: false,
  as: 'button',
  type: null,
}

const forwardRef = (props, ref) => <Touchable {...props} innerRef={ref} />
const ForwardRef = React.forwardRef(forwardRef)
ForwardRef.displayName = 'fwd(Touchable)'

export { ForwardRef as Touchable }
