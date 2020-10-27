import { css } from '@emotion/core'
import { SwitchState, Box } from '@smooth-ui/core-em'
import PropTypes from 'prop-types'
import React from 'react'
import { theme } from '../../theme'
import { Tooltip } from '../Tooltip'

const styles = {
  container: ({ checked, disabled }) =>
    css({
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      borderRadius: 4,
      alignItems: 'center',
      borderStyle: 'solid',
      borderColor: theme.gray350,
      borderWidth: 1,
      padding: 16,
      transition: 'color 0.2s, border-color 0.2s, box-shadow 0.2s',
      userSelect: 'none',
      touchAction: 'manipulation',
      color: theme.gray550,
      fontSize: 16,
      lineHeight: '22px',
      position: 'relative',
      fontWeight: 500,
      input: {
        cursor: disabled ? 'not-allowed' : 'pointer',
      },
      ':hover,:focus': !checked &&
        !disabled && {
          color: theme.gray550,
          borderColor: theme.primary,
          boxShadow: `0 0 8px 2px ${theme.gray200}`,
          select: {
            color: theme.gray550,
          },
        },
    }),
  focused: css({
    boxShadow: `0 0 8px 2px ${theme.gray200}`,
  }),
  checked: css({
    cursor: 'auto',
    color: theme.primary,
    borderColor: theme.primary,
  }),
  disabled: css({
    cursor: 'not-allowed',
    color: theme.gray350,
    backgroundColor: theme.gray50,
    borderColor: theme.gray350,
    pointerEvents: 'none',
  }),
}

const variants = {
  segment: {
    switchButton: css`
      font-size: 14;
      height: 40px;
      transition: none;
      :hover,
      :focus {
        box-shadow: none;
        border: none;
        color: ${theme.gray700};
      }
      border-radius: 4px;
      box-shadow: none;
    `,
    checked: css`
      background-color: ${theme.primary};
      color: ${theme.white};
      :hover {
        color: ${theme.white};
      }
    `,
    notChecked: css`
      background-color: white;
      color: ${theme.gray700};
      border-color: ${theme.transparent};
      :hover,
      :focus {
        color: ${theme.gray700};
        border: none;
        box-shadow: none;
      }
    `,
  },
}

export const SwitchButton = ({
  checked,
  disabled,
  defaultChecked,
  onChange,
  onFocus,
  onBlur,
  name,
  value,
  size,
  children,
  tooltip,
  variant,
  ...props
}) => (
  <SwitchState
    name={name}
    value={value}
    checked={checked}
    defaultChecked={defaultChecked}
    onChange={onChange}
    onFocus={onFocus}
    onBlur={onBlur}
    disabled={disabled}
  >
    {({ focused, checked, disabled, input }) => (
      <Tooltip text={tooltip}>
        <Box
          as="label"
          htmlFor={`${name}-${value}`}
          disabled={disabled}
          css={[
            styles.container({ checked, disabled }),
            focused && styles.focused,
            checked && styles.checked,
            disabled && styles.disabled,
            variant && variants[variant]?.switchButton,
            checked
              ? variants[variant]?.checked
              : variants[variant]?.notChecked,
          ]}
          {...props}
        >
          {typeof children === 'function'
            ? children({ focused, checked, disabled })
            : children}
          <input
            id={`${name}-${value}`}
            type="radio"
            {...input}
            style={{ ...input.style, ...(checked ? { zIndex: -1 } : null) }}
          />
        </Box>
      </Tooltip>
    )}
  </SwitchState>
)

SwitchButton.defaultProps = {
  size: 24,
  disabled: false,
  defaultChecked: false,
  variant: 'default',
  onFocus: () => {},
  onBlur: () => {},
}

SwitchButton.propTypes = {
  checked: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  size: PropTypes.number,
  variant: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}
