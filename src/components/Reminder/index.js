import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'
import { theme } from '../../theme'
import { Box } from '../Box'
import { Icon } from '../Icon'
import { UniversalLink } from '../UniversalLink'

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

const Notification = styled(Box, {
  shouldForwardProp: prop => !['variant', 'bordered'].includes(prop),
})`
  height: 28px;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 14px;
  text-decoration: none;
  color: ${theme.gray700};
  font-weight: 400;

  &:hover {
    text-decoration: none;
  }

  ${({ variant, bordered }) => `
    background-color: ${
      bordered ? theme.transparent : variants[variant].background
    };
    border: 1px solid ${bordered ? theme.gray300 : theme.transparent};
    transition: all .3s ease-in-out;

    &:hover {
      box-shadow: 0 3px 6px ${variants[variant].background};
      border: 1px solid ${variants[variant].main};
    }
  `}

  & strong {
    ${({ variant }) => `
      color: ${variants[variant].main};
    `}
  }
`

export const Reminder = ({ text, variant, bordered, ...props }) => (
  <Notification
    as={props.to ? UniversalLink : 'a'}
    type={props.to ? null : 'button'}
    icon="east"
    style={{}}
    fontSize={12}
    px={1}
    py={1}
    bordered={bordered}
    variant={variant}
    {...props}
  >
    <span
      dangerouslySetInnerHTML={{
        __html: text.replace(/\[(.*)\]/, '<strong>$1</strong>'),
      }}
    />
    <Icon ml="4px" color={variants[variant].main} name="east" size={20} />
  </Notification>
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
