import React from 'react'
import PropTypes from 'prop-types'
import { cx, sp } from 'utils'
import { css } from '@emotion/core'
import { Box } from '@smooth-ui/core-em'
import flattenChildren from 'react-flatten-children'
import { transparentize } from 'polished'
import {
  gray50,
  gray100,
  gray350,
  white,
  black,
  primary,
  warning,
  borderRadius,
} from 'theming'
import { Icon } from './Icon'

const styles = {
  container: css`
    position: relative;
    display: flex;
    justify-content: center;
  `,
  select: p => css`
    transition: box-shadow 0.2s ease, border-color 0.2s ease;
    appearance: none;
    background-color: ${white(p)}
    background-image: none;
    border-width: 1px;
    border-color: ${gray350(p)};
    border-style: solid;
    border-radius: ${borderRadius(p)};
    color: ${black(p)};
    display: block;
    height: ${sp(6)(p)};
    max-width: 100%;
    outline: none;
    position: relative;
    width: 100%;
    padding-left: ${sp(1)(p)};
    padding-right: ${sp(3)(p)};
    font-weight: 500;
    font-size: 16px;
    line-height: ${sp(3)(p)};

    &:focus: {
      box-shadow: 0 0 0 2px ${transparentize(0.75, primary(p))};
      border-color: ${primary(p)};
    }
  `,
  label: p => css`
    position: absolute;
    padding-left: ${sp(1)(p)};
    padding-right: ${sp(1)(p)};
    pointer-events: none;
    color: ${black(p)};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
  `,
  error: p => css`
    border-color: ${warning(p)};
    color: ${warning(p)};
  `,
  disabled: p => css`
    cursor: default;
    pointer-events: none;
    background: ${gray50(p)};
    color: ${gray350(p)};
    border-color: ${gray350(p)};
  `,
  readOnly: p => css`
    background: ${gray100(p)};
    border-color: ${gray100(p)};
    color: ${black(p)};
  `,
  chevron: p => css`
    background-color: transparent;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    justify-content: center;
    padding: ${sp(1)(p)};
    pointer-events: none;
  `,
}

export function Select({
  styles: mainStyles = [],
  selectStyles = [],
  chevronStyles = [],
  error,
  disabled,
  readOnly,
  name,
  value,
  onChange,
  onBlur,
  required,
  arrowColor,
  children,
  id,
  ...props
}) {
  const disabledChildren = () =>
    flattenChildren(children).map((child, index) =>
      React.cloneElement(child, {
        key: index,
        disabled: true,
        ...child.props,
      }),
    )

  return (
    <Box css={cx([styles.container, ...mainStyles])} {...props}>
      <select
        css={cx([
          styles.select,
          disabled && styles.disabled,
          readOnly && styles.readOnly,
          error && styles.error,
          ...selectStyles,
        ])}
        id={id}
        name={name}
        required={required}
        disabled={disabled}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      >
        {readOnly ? disabledChildren() : children}
      </select>

      <Box css={cx([styles.chevron, ...chevronStyles])}>
        <Icon
          name="chevron-down"
          size={11}
          mt={1}
          color={
            arrowColor || (error ? 'warning' : disabled ? 'grey' : 'darkGrey')
          }
        />
      </Box>
    </Box>
  )
}

Select.Option = 'option'

Select.OptGroup = 'optgroup'

Select.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  disabled: PropTypes.bool,

  required: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.string,
  arrowColor: PropTypes.string,
}
