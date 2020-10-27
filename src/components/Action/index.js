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

const Action = ({
  key,
  name,
  size = 20,
  children,
  tooltip,
  rounded,
  ...props
}) => {
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
  key: PropTypes.string,
  name: PropTypes.string,
  rounded: PropTypes.bool,
  size: PropTypes.number,
  tooltip: PropTypes.string,
  variant: PropTypes.string,
}

Action.defaultProps = {
  rounded: false,
  size: 16,
  variant: 'primary',
}

export { Action }
