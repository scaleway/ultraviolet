import { css } from '@emotion/react'
import PropTypes from 'prop-types'
import React, {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactNode,
  forwardRef,
} from 'react'
import Box, { XStyledProps } from '../Box'

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

export type TouchableProps = {
  activeOpacity?: number | string
  as?: string
  children?: ReactNode
  disabled?: boolean
  hasFocus?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLDivElement>
  onKeyDown?: KeyboardEventHandler<HTMLButtonElement | HTMLDivElement>
  title?: string
} & (
  | ButtonHTMLAttributes<HTMLButtonElement>
  | InputHTMLAttributes<HTMLInputElement>
) &
  XStyledProps

const Touchable = forwardRef<Element, TouchableProps>(
  (
    {
      activeOpacity,
      as = 'button',
      children,
      disabled = false,
      hasFocus = false,
      type,
      title,
      onClick,
      onKeyDown,
      ...props
    },
    ref,
  ) => {
    const typeProperty = as === 'button' ? 'button' : type

    return (
      <Box
        ref={ref}
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
        title={title}
        type={typeProperty}
        disabled={disabled}
        tabIndex={hasFocus ? 0 : undefined}
        onClick={onClick}
        onKeyDown={onKeyDown}
      >
        {children}
      </Box>
    )
  },
)

Touchable.propTypes = {
  activeOpacity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  as: PropTypes.string,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  hasFocus: PropTypes.bool,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  title: PropTypes.string,
  type: PropTypes.string,
}

export default Touchable
