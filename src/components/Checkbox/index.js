import { css } from '@emotion/core'
import { SwitchState } from '@smooth-ui/core-em'
import PropTypes from 'prop-types'
import React from 'react'
import { borderRadius, gray100, gray550, primary } from '../../theming'
import { cx } from '../../utils'
import { ActivityIndicator } from '../ActivityIndicator'
import { Box } from '../Box'
import { Expandable } from '../Expandable'
import { Icon } from '../Icon'
import { Typography } from '../Typography'

const styles = {
  container: css`
    position: relative;
    display: inline-flex;
    align-items: flex-start;
  `,
  hover: p => css`
    &:hover {
      svg {
        border-radius: ${borderRadius(p)};
        background-color: ${!p.disabled && gray100(p)};
        fill: ${primary(p)};
        transition: fill 300ms;
      }
    }
  `,
  input: p => css`
    &:focus + svg {
      outline: 1px ${gray550(p)} dotted;
    }
  `,
  icon: css`
    box-sizing: content-box;
  `,
  enabled: css`
    cursor: pointer;
  `,
  disabled: css`
    cursor: not-allowed;
  `,
  children: size => css`
    padding-top: ${size > 27 ? '4px' : '2px'};
  `,
}

export function Checkbox({
  checked,
  defaultChecked,
  onChange,
  onFocus,
  onBlur,
  valid,
  error,
  name,
  value,
  size = 24,
  children,
  progress,
  id,
  disabled,
  typoVariant,
  ...props
}) {
  const hasChildren = Boolean(children)
  return (
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
        <Box {...props}>
          <Typography css={cx([styles.container, !disabled && styles.hover])}>
            <input
              css={cx([
                styles.input,
                !disabled ? styles.enabled : styles.disabled,
              ])}
              type="checkbox"
              {...input}
              id={id}
              disabled={disabled}
            />
            {progress ? (
              <ActivityIndicator size={size} mr={hasChildren ? 1 : 0} />
            ) : (
              <Icon
                mr={hasChildren ? '10px' : 0}
                p="2px"
                css={styles.icon}
                name={
                  checked ? 'checkbox-marked-outline' : 'checkbox-blank-outline'
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
          <Expandable
            height={56}
            overflow="hidden"
            mt="-6px"
            opened={Boolean(error)}
          >
            <Box fontSize={12} color="warning" px="4px">
              {error}
            </Box>
          </Expandable>
        </Box>
      )}
    </SwitchState>
  )
}

Checkbox.propTypes = {
  valid: PropTypes.bool,
  progress: PropTypes.bool,
  size: PropTypes.number,
  children: PropTypes.node,
  error: PropTypes.string,
}

export default Checkbox
