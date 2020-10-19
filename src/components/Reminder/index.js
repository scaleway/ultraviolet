import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'
import { theme } from 'theme'
import { UniversalLink } from 'components/UniversalLink'
import { Typography } from 'components/Typography'
import { Icon } from 'components/Icon'

const variants = {
  error: {
    main: theme.red,
    background: theme.pippin,
  },
  warning: {
    main: theme.orange,
    background: theme.serenade,
  },
  info: {
    main: theme.blue,
    background: theme.zumthor,
  },
}

const Notification = styled(Typography, {
  shouldForwardProp: prop => prop !== 'variant',
})`
  height: 28px;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 14px;

  ${({ variant, bordered }) => `
    background-color: ${
      bordered ? theme.transparent : variants[variant].background
    };
    border: 1px solid ${bordered ? theme.gray300 : theme.transparent};
    transition: all 0.3s ease-in-out;

    &:hover {
      box-shadow: 0px 3px 6px ${variants[variant].background};
      border: 1px solid ${variants[variant].main};
    }
  `}

  & b {
    ${({ variant }) => `
      color: ${variants[variant].main};
    `}
  }
`

export const Reminder = ({ text, variant, bordered, ...props }) => (
  <UniversalLink style={{ display: 'flex', textDecoration: 'none' }} {...props}>
    <Notification
      fontSize={12}
      px={1}
      py={1}
      bordered={bordered}
      variant={variant}
    >
      <div
        dangerouslySetInnerHTML={{
          __html: text.replace(/\[(.*)\]/, '<b>$1</b>'),
        }}
      />
      <Icon ml="4px" color={variants[variant].main} name="east" size={20} />
    </Notification>
  </UniversalLink>
)

Reminder.propTypes = {
  variant: PropTypes.oneOf(['error', 'warning', 'info']),
  bordered: PropTypes.bool,
  text: PropTypes.string.isRequired,
}

Reminder.defaultProps = {
  variant: 'info',
  bordered: false,
}
