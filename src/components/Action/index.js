import { css } from '@emotion/react'
import PropTypes from 'prop-types'
import React, { forwardRef } from 'react'
import Button, { buttonVariants } from '../Button'
import Icon, { icons } from '../Icon'
import Tooltip from '../Tooltip'

const action = rounded => css`
  width: 32px;
  height: 32px;
  padding: 0;
  flex-shrink: 0;
  > svg {
    // safari issue prevent event propgation
    pointer-events: none;
  }
  ${rounded && `border-radius: 16px;`}
`

const Action = forwardRef(
  ({ name, size, children, tooltip, rounded, ...props }, ref) => {
    if (!name && !children) {
      throw new Error(
        'Action component need to have either children (as string) or a name prop',
      )
    }

    return (
      <Tooltip text={tooltip}>
        <Button ref={ref} css={action(rounded)} {...props}>
          {name && <Icon size={size} name={name} />}
          {children}
        </Button>
      </Tooltip>
    )
  },
)

Action.propTypes = {
  children: PropTypes.node,
  /**
   * Name of the icon. All [icons](/?path=/docs/components-icon) are supported.
   */
  name: PropTypes.oneOf(icons),
  rounded: PropTypes.bool,
  /**
   * Size of the icon (can't be greater than 32)
   */
  size: (props, propName, componentName) => {
    const { [propName]: propsPropName } = props
    if (typeof propsPropName !== 'number' || propsPropName > 32) {
      return new Error(
        `Invalid prop ${propName} supplied to ${componentName}. Must be a "number" and inferior or equal to 32`,
      )
    }

    return null
  },
  tooltip: PropTypes.string,
  variant: PropTypes.oneOf(buttonVariants),
}

Action.defaultProps = {
  children: null,
  name: undefined,
  rounded: false,
  size: 20,
  tooltip: undefined,
  variant: 'primary',
}

export default Action
