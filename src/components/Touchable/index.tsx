import { css } from '@emotion/react'
import PropTypes from 'prop-types'
import React, { FunctionComponent } from 'react'
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

type TouchableProps = {
  innerRef: React.Ref<Element>
  children?: React.ReactNode
  disabled?: boolean
  activeOpacity?: number | string
  hasFocus?: boolean
  as?: string
  type?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLDivElement>
}

const FwdTouchable: FunctionComponent<TouchableProps> = ({
  activeOpacity,
  as = 'button',
  children,
  disabled = false,
  hasFocus = false,
  innerRef,
  type,
  onClick,
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
    onClick={onClick}
  >
    {children}
  </Box>
)

FwdTouchable.propTypes = {
  activeOpacity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  as: PropTypes.string,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  hasFocus: PropTypes.bool,
  innerRef: PropTypes.func,
  type: PropTypes.string,
}

const Touchable = React.forwardRef<Element, Omit<TouchableProps, 'innerRef'>>(
  (props, ref) => <FwdTouchable {...props} innerRef={ref} />,
)
Touchable.displayName = 'fwd(Touchable)'

Touchable.propTypes = FwdTouchable.propTypes

export default Touchable
