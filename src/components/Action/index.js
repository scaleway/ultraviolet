import { css } from '@emotion/core'
import PropTypes from 'prop-types'
import React from 'react'
import { Button } from '../Button'
import { Icon } from '../Icon'
import { Tooltip } from '../Tooltip'

const action = rounded => css`
  width: 32px;
  height: 32px;
  padding: 0;
  flex-shrink: 0;
  ${rounded
    ? `
    border-radius: 16px;
  `
    : ''}
`

const Action = ({ key, name, size, children, tooltip, rounded, ...props }) => {
  if (!name && !children) {
    throw new Error(
      'Action component need to have either children (as string) or a name prop',
    )
  }

  return (
    <Tooltip key={key} text={tooltip}>
      <Button css={action(rounded)} {...props}>
        {name && <Icon size={size} name={name} />}
        {children}
      </Button>
    </Tooltip>
  )
}

Action.propTypes = {
  children: PropTypes.node,
  size: (props, propName, componentName) => {
    if (typeof props[propName] !== 'number' || props[propName] > 32) {
      return new Error(
        `Invalid prop ${propName} supplied to ${componentName}. Must be a "number" and inferior or equal to 32`,
      )
    }
    return null
  },
  key: PropTypes.string,
  name: PropTypes.string,
  rounded: PropTypes.bool,
  tooltip: PropTypes.string,
  variant: PropTypes.string,
}

Action.defaultProps = {
  size: 16,
  rounded: false,
  variant: 'primary',
}

export { Action }
