import { css } from '@emotion/core'
import { SwitchState, Box } from '@smooth-ui/core-em'
import { transparentize } from 'polished'
import PropTypes from 'prop-types'
import React from 'react'
import { gray300, primary } from 'theming'
import { cx } from 'utils'
import { Icon } from './Icon'

const style = (disabled) => p => css`
  position: relative;
  display: flex;
  align-items: center;
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;

  ${disabled && `color: ${gray300(p)};`}

  :hover,
  :focus {
    ${!disabled &&
    `.radio-container {
      background-color: ${transparentize(0.75, gray300(p))};
      border-radius: 50%;

      > svg {
        fill: ${primary(p)};
      }
    }
    `}
  }
`

const Radio = ({
  checked,
  defaultChecked,
  onChange,
  onFocus,
  onBlur,
  disabled,
  name,
  value,
  size,
  children,
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
  >
    {({ checked, input }) => (
      <Box css={cx(style(disabled))} {...props}>
        <Box
          mr={1}
          minWidth={32}
          width={32}
          height={32}
          display="flex"
          alignItems="center"
          justifyContent="center"
          className="radio-container"
        >
          <Icon
            name={checked ? 'radiobox-marked' : 'radiobox-blank'}
            color={disabled ? 'light' : checked ? 'primary' : 'lightGrey'}
            size={size}
          />
        </Box>
        {children}
        <input
          type="radio"
          disabled={disabled}
          css={css`
            cursor: ${disabled ? 'not-allowed' : 'pointer'};
          `}
          {...input}
        />
      </Box>
    )}
  </SwitchState>
)

Radio.propTypes = {
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.string,
  size: PropTypes.number,
  children: PropTypes.node,
}

Radio.defaultProps = { size: 24 }

export default Radio
