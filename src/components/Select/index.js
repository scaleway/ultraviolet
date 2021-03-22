import { css } from '@emotion/react'
import { transparentize } from 'polished'
import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import flattenChildren from 'react-flatten-children'
import { colors, radii, space } from '../../theme'
import { ActivityIndicator } from '../ActivityIndicator'
import { Box } from '../Box'
import Icon from '../Icon'

const styles = {
  container: css`
    position: relative;
    display: flex;
    justify-content: center;
  `,
  select: css`
    transition: box-shadow 0.2s ease, border-color 0.2s ease;
    appearance: none;
    background-color: ${colors.white};
    background-image: none;
    border-width: 1px;
    border-color: ${colors.gray350};
    border-style: solid;
    border-radius: ${radii.default};
    color: ${colors.black};
    display: block;
    height: ${space['6']};
    max-width: 100%;
    outline: none;
    position: relative;
    width: 100%;
    padding-left: ${space['1']};
    padding-right: ${space['4']};
    font-weight: 500;
    font-size: 16px;
    line-height: ${space['3']};

    &:focus {
      box-shadow: 0 0 0 2px ${transparentize(0.75, colors.primary)};
      border-color: ${colors.primary};
    }
  `,
  label: css`
    position: absolute;
    padding-left: ${space['1']};
    padding-right: ${space['1']};
    pointer-events: none;
    color: ${colors.black};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
  `,
  error: css`
    border-color: ${colors.warning};
    color: ${colors.warning};
  `,
  disabled: css`
    cursor: default;
    pointer-events: none;
    background: ${colors.gray50};
    color: ${colors.gray350};
    border-color: ${colors.gray350};
  `,
  readOnly: css`
    background: ${colors.gray100};
    border-color: ${colors.gray100};
    color: ${colors.black};
  `,
  chevron: css`
    background-color: transparent;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    padding: ${space[1]};
  `,
}

export function Select({
  styles: mainStyles,
  selectStyles,
  chevronStyles,
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
  isLoading,
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

  const color = useMemo(() => {
    if (arrowColor) return arrowColor
    if (error) return 'warning'
    if (disabled) return 'gray'

    return 'gray550'
  }, [arrowColor, error, disabled])

  return (
    <Box css={[styles.container, ...mainStyles]} {...props}>
      <select
        css={[
          styles.select,
          disabled && styles.disabled,
          readOnly && styles.readOnly,
          error && styles.error,
          ...selectStyles,
        ]}
        id={id}
        name={name}
        required={required}
        disabled={disabled || isLoading}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      >
        {readOnly ? disabledChildren() : children}
      </select>

      <Box css={[styles.chevron, ...chevronStyles]}>
        {isLoading ? (
          <ActivityIndicator size={20} />
        ) : (
          <Icon name="chevron-down" size={11} color={color} />
        )}
      </Box>
    </Box>
  )
}

Select.Option = 'option'
Select.OptGroup = 'optgroup'

Select.defaultProps = {
  arrowColor: undefined,
  chevronStyles: [],
  children: null,
  disabled: false,
  error: undefined,
  id: undefined,
  isLoading: false,
  name: undefined,
  onBlur: undefined,
  onChange: () => {},
  readOnly: false,
  required: false,
  styles: [],
  selectStyles: [],
  value: undefined,
}

Select.propTypes = {
  arrowColor: PropTypes.string,
  chevronStyles: PropTypes.arrayOf(PropTypes.shape({})),
  children: PropTypes.node,
  disabled: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  id: PropTypes.string,
  isLoading: PropTypes.bool,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  name: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  styles: PropTypes.arrayOf(PropTypes.shape({})),
  selectStyles: PropTypes.arrayOf(PropTypes.shape({})),
  value: PropTypes.string,
}
