import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, { FunctionComponent } from 'react'
import { Color } from '../../theme/colors'
import Box, { BoxProps } from '../Box'
import Icon from '../Icon'
import MarkDown from '../MarkDown'
import UniversalLink from '../UniversalLink'

export const variants = {
  error: {
    background: 'pippin',
    main: 'red',
  },
  info: {
    background: 'zumthor',
    main: 'blue',
  },
  warning: {
    background: 'serenade',
    main: 'orange',
  },
}

type Variants = keyof typeof variants
const reminderVariants = Object.keys(variants) as Variants[]

const Notification = styled(Box, {
  shouldForwardProp: prop => !['variant', 'bordered'].includes(prop.toString()),
})<{
  variant: Variants
  bordered: boolean
  type?: string
  to?: string
}>`
  height: 28px;
  width: max-content;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 14px;
  text-decoration: none;
  color: ${({ theme }) => theme.colorsDeprecated.gray700};
  font-weight: 400;

  &:hover {
    text-decoration: none;
  }

  ${({ variant, bordered, theme }) => `
    background-color: ${
      bordered
        ? theme.colorsDeprecated.transparent
        : theme.colorsDeprecated[variants[variant].background as Color]
    };
    border: 1px solid ${
      bordered
        ? theme.colorsDeprecated.gray300
        : theme.colorsDeprecated.transparent
    };
    transition: all .3s ease-in-out;

    &:hover {
      box-shadow: 0 3px 6px ${
        theme.colorsDeprecated[variants[variant].background as Color]
      };
      border: 1px solid ${
        theme.colorsDeprecated[variants[variant].main as Color]
      };
    }
  `}

  & strong {
    ${({ variant, theme }) => `
      color: ${theme.colorsDeprecated[variants[variant].main as Color]};
    `}
  }
`

type ReminderProps = {
  bordered?: boolean
  text: string
  to?: string
  variant?: Variants
} & BoxProps

const Reminder: FunctionComponent<ReminderProps> = ({
  text,
  variant = 'info',
  bordered = false,
  to,
  ...props
}) => (
  <Notification
    as={to ? (UniversalLink as React.ElementType) : 'a'}
    type={to ? undefined : 'button'}
    style={{}}
    fontSize={12}
    px={1}
    py={1}
    bordered={bordered}
    variant={variant}
    to={to}
    {...props}
  >
    <MarkDown inline source={text.replace(/\[(.*)\]/, '__$1__')} />
    <Icon ml="4px" color={variants[variant].main} name="east" size={20} />
  </Notification>
)

Reminder.propTypes = {
  bordered: PropTypes.bool,
  text: PropTypes.string.isRequired,
  to: PropTypes.string,
  variant: PropTypes.oneOf<Variants>(reminderVariants),
}

export default Reminder
