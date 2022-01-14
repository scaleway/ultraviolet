import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { FunctionComponent } from 'react'
import * as React from 'react'
import { Color } from '../../theme'
import Box, { BoxProps } from '../Box'
import Icon from '../Icon'
import MarkDown from '../MarkDown'
import UniversalLink from '../UniversalLink'

export const variants = ['error', 'info', 'warning'] as const

type Variant = typeof variants[number]

const variantToColor = (variant: Variant): Color =>
  variant === 'error' ? 'danger' : variant

const Notification = styled(Box, {
  shouldForwardProp: prop => !['variant', 'bordered'].includes(prop.toString()),
})<{
  variant: Variant
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
  font-weight: 400;
  transition: all 0.3s ease-in-out;
  ${({ variant, bordered, theme }) => {
    const color = variantToColor(variant)

    return `
    background-color: ${
      bordered ? 'transparent' : theme.colors[color].background
    };
    border: 1px solid ${
      bordered ? theme.colors.neutral.borderWeak : 'transparent'
    };
    color: ${theme.colors.neutral.text};
    &:hover {
      text-decoration: none;
      box-shadow: 0 3px 6px ${theme.colors[color].background};
      border: 1px solid ${theme.colors[color].border};
    }
    & strong {
      color: ${theme.colors[color].text};
    }
  `
  }}
`

type ReminderProps = {
  bordered?: boolean
  text: string
  to?: string
  variant?: Variant
} & BoxProps

const Reminder: FunctionComponent<ReminderProps> = ({
  text,
  variant = 'info',
  bordered = false,
  to,
  ...props
}) => {
  const theme = useTheme()

  return (
    <Notification
      as={to ? (UniversalLink as React.ElementType) : 'a'}
      type={to ? undefined : 'button'}
      fontSize={12}
      px={1}
      py={1}
      bordered={bordered}
      variant={variant}
      to={to}
      {...props}
    >
      <MarkDown inline source={text.replace(/\[(.*)\]/, '__$1__')} />
      <Icon
        ml="4px"
        color={theme.colors[variantToColor(variant)].text}
        name="east"
        size={20}
      />
    </Notification>
  )
}

Reminder.propTypes = {
  bordered: PropTypes.bool,
  text: PropTypes.string.isRequired,
  to: PropTypes.string,
  variant: PropTypes.oneOf(variants),
}

export default Reminder
