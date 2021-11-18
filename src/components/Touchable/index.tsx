import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactNode,
  forwardRef,
} from 'react'
import Box, { BoxProps, XStyledProps } from '../Box'

const StyledTouchable = styled(Box)<
  BoxProps & { activeOpacity?: number | string }
>`
  border: 0;
  transition-property: opacity;
  transition-duration: 0.15s;
  user-select: none;
  background-color: transparent;
  padding: 0;
  margin: 0;

  &[aria-disabled="true"] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &[aria-disabled="false"] {
    cursor: pointer;
    touch-action: manipulation;
  }

  &[aria-disabled="false"]:active {
      opacity: ${({ activeOpacity }) => activeOpacity};
    }
  }
`

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
      <StyledTouchable
        activeOpacity={activeOpacity}
        ref={ref}
        {...props}
        as={as}
        title={title}
        type={typeProperty}
        aria-disabled={disabled}
        disabled={disabled}
        tabIndex={hasFocus ? 0 : undefined}
        onClick={onClick}
        onKeyDown={onKeyDown}
      >
        {children}
      </StyledTouchable>
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
