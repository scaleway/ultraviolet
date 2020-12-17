import { css } from '@emotion/core'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { Checkbox as ReakitCheckbox, useCheckboxState } from 'reakit/Checkbox'
import { borderRadius, gray100, gray550, primary } from '../../theming'
import { cx } from '../../utils'
import { ActivityIndicator } from '../ActivityIndicator'
import { Box } from '../Box'
import { Expandable } from '../Expandable'
import { Icon } from '../Icon'
import { Typography, typographyVariants } from '../Typography'

const styles = {
  container: css`
    position: relative;
    display: inline-flex;
    align-items: flex-start;
  `,
  hover: p => css`
    cursor: ${p.disabled ? 'not-allowed' : 'pointer'};
    &:hover {
      svg {
        border-radius: ${borderRadius(p)};
        background-color: ${!p.disabled && gray100(p)};
        fill: ${!p.disabled && primary(p)};
        transition: fill 300ms;
      }
    }
  `,
  input: p => css`
    opacity: 0.01;
    width: ${p.size}px;
    height: ${p.size}px;
    position: absolute;
    cursor: pointer;
    margin-right: ${p.hasChildren ? '10px' : 0};
    padding: 2px;
    &:focus + svg {
      outline: 1px ${gray550(p)} dotted;
    }
  `,
  icon: css`
    box-sizing: content-box;
  `,
  children: size => css`
    padding-top: ${size > 27 ? '4px' : '2px'};
  `,
}

export function Checkbox({
  checked,
  onChange,
  onFocus,
  onBlur,
  valid,
  error,
  name,
  value,
  size,
  children,
  progress,
  disabled,
  typographyVariant,
  ...props
}) {
  const hasChildren = Boolean(children)
  const checkbox = useCheckboxState({ state: checked })

  useEffect(() => {
    checkbox.setState(checked)
  }, [checked])

  return (
    <Box {...props}>
      <Typography
        as="label"
        variant={typographyVariant}
        css={cx([styles.container, styles.hover({ disabled })])}
      >
        <ReakitCheckbox
          {...checkbox}
          css={styles.input({ size, hasChildren })}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          checked={checked}
          disabled={disabled}
          value={value}
          name={name}
        />
        {progress ? (
          <ActivityIndicator size={size} mr={hasChildren ? 1 : 0} />
        ) : (
          <Icon
            mr={hasChildren ? '10px' : 0}
            p="2px"
            css={styles.icon}
            name={
              checkbox?.state
                ? 'checkbox-marked-outline'
                : 'checkbox-blank-outline'
            }
            color={
              disabled
                ? 'gray100'
                : valid === false || Boolean(error)
                ? 'warning'
                : valid === true
                ? 'success'
                : checked
                ? 'primary'
                : 'gray300'
            }
            size={size}
          />
        )}
        {hasChildren && <div css={styles.children(size)}>{children}</div>}
      </Typography>
      <Expandable height={56} overflow="hidden" opened={Boolean(error)}>
        <Box fontSize={12} color="warning" px="4px">
          {error}
        </Box>
      </Expandable>
    </Box>
  )
}

Checkbox.defaultProps = {
  checked: false,
  disabled: false,
  onBlur: () => {},
  onFocus: () => {},
  progress: false,
  name: 'checkbox',
  typographyVariant: 'default',
  size: 24,
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  progress: PropTypes.bool,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  valid: PropTypes.bool,
  size: PropTypes.number,
  typographyVariant: PropTypes.oneOf(typographyVariants),
}

export default { Checkbox }
