import { css } from '@emotion/react'
import PropTypes from 'prop-types'
import React from 'react'
import Box from '../Box'

const styles = {
  actionable: css`
    cursor: pointer;
    touch-action: manipulation;
  `,
  disabled: css`
    opacity: 0.5;
  `,
  root: css`
    border: 0;
    transition-property: opacity;
    transition-duration: 0.15s;
    user-select: none;
    background-color: transparent;
    padding: 0;
    margin: 0;
  `,
}

const BaseTouchable = ({
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

BaseTouchable.propTypes = {
  activeOpacity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  as: PropTypes.string,
  disabled: PropTypes.bool,
  hasFocus: PropTypes.bool,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({})]),
  type: PropTypes.string,
}

BaseTouchable.defaultProps = {
  activeOpacity: null,
  as: 'button',
  disabled: false,
  hasFocus: false,
  innerRef: null,
  type: null,
}

const forwardRef = (props, ref) => <BaseTouchable {...props} innerRef={ref} />
const Touchable = React.forwardRef(forwardRef)
Touchable.displayName = 'fwd(Touchable)'

export default Touchable
