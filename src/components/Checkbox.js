import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { SwitchState } from '@smooth-ui/core-em'
import { cx } from 'utils'
import { ActivityIndicator } from './ActivityIndicator'
import { Icon } from './Icon'
import { Typography } from './Typography'

const styles = {
  container: css`
    position: relative;
    display: inline-flex;
    align-items: center;
  `,
}

export function Checkbox({
  checked,
  defaultChecked,
  onChange,
  onFocus,
  onBlur,
  valid,
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
        <Typography css={cx(styles.container)} {...props}>
          {progress ? (
            <ActivityIndicator mr={hasChildren ? 1 : 0} />
          ) : (
            <Icon
              mr={hasChildren ? 1 : 0}
              name={
                checked ? 'checkbox-marked-outline' : 'checkbox-blank-outline'
              }
              color={
                disabled
                  ? 'gray100'
                  : valid === false
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
          {hasChildren ? <span>{children}</span> : null}
          <input type="checkbox" {...input} id={id} disabled={disabled} />
        </Typography>
      )}
    </SwitchState>
  )
}

Checkbox.propTypes = {
  valid: PropTypes.bool,
  progress: PropTypes.bool,
  size: PropTypes.number,
  children: PropTypes.node,
}

export default Checkbox
