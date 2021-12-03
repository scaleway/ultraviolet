import { Theme, useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, { FunctionComponent, MouseEventHandler, ReactNode } from 'react'
import Badge from '../Badge'
import Box from '../Box'
import Button from '../Button'
import Icon, { IconName, icons } from '../Icon'
import Typography from '../Typography'

export const variants = {
  error: ({ colorsDeprecated }: Theme) => ({
    background: colorsDeprecated.pippin,
    main: colorsDeprecated.red,
  }),
  info: ({ colorsDeprecated }: Theme) => ({
    background: colorsDeprecated.zumthor,
    main: colorsDeprecated.blue,
  }),
  success: ({ colorsDeprecated }: Theme) => ({
    background: colorsDeprecated.foam,
    main: colorsDeprecated.gray700,
  }),
  warning: ({ colorsDeprecated }: Theme) => ({
    background: colorsDeprecated.serenade,
    main: colorsDeprecated.orange,
  }),
}

export type Variants = keyof typeof variants

const StyledContainer = styled(Box, {
  shouldForwardProp: prop => !['variant'].includes(prop.toString()),
})<{ variant: Variants }>`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  position: relative;
  padding: 16px;
  background-color: ${({ variant, theme }) =>
    variants[variant]?.(theme).background};
`

const StyledBadgeContainer = styled(Box)`
  position: absolute;
  top: -12px;
  left: 16px;
  font-weight: 500;
  text-transform: uppercase;
`

const StyledTitle = styled(Typography, {
  shouldForwardProp: prop => !['color'].includes(prop.toString()),
})<{ color: Variants }>`
  font-weight: 600;
  text-transform: uppercase;
  color: ${({ theme, color }) => variants[color]?.(theme).main};
`

const StyledButtonLink = styled(Button)`
  margin-top: auto;
  color: ${({ theme: { colorsDeprecated } }) => colorsDeprecated.blue};
  background-color: ${({ theme: { colorsDeprecated } }) =>
    colorsDeprecated.transparent};
  padding: 0;
  width: transparent;
  display: flex;
  align-items: center;
  justify-content: left;
  text-decoration: none;
  font-size: 14px;
`

export type ExtendedReminderProps = {
  /**
   * The text to be placed in the top badge
   */
  badgeText: string
  /**
   * The icon to use in the badge
   */
  icon: IconName
  /**
   * The link text to display at the end
   */
  linkText?: string
  /**
   * MouseEvent listener on the component
   */
  onClick?: MouseEventHandler
  text: string
  title: string
  /**
   * The link that linkText prop need to redirect to.
   */
  to?: string
  variant?: Variants
  /**
   * Custom link component
   */
  CustomLink?: ReactNode
}

const ExtendedReminder: FunctionComponent<ExtendedReminderProps> = ({
  badgeText,
  icon,
  linkText,
  onClick,
  text,
  title,
  to,
  variant = 'info',
  CustomLink,
  ...props
}) => {
  const theme = useTheme()
  const badgeVariant = {
    error: 'error',
    info: 'info',
    success: 'success',
    warning: 'beta',
  } as const

  return (
    <StyledContainer variant={variant} {...props}>
      <StyledBadgeContainer>
        <Badge size="small" variant={badgeVariant[variant]}>
          <Icon
            mr="4px"
            color={theme.colorsDeprecated.white}
            name={icon}
            size={16}
          />
          {badgeText}
        </Badge>
      </StyledBadgeContainer>
      <StyledTitle color={variant} mb={1} variant="bodyC">
        {title}
      </StyledTitle>
      <Typography mb={1} variant="bodyD">
        {text}
      </Typography>
      {CustomLink ||
        (linkText ? (
          <StyledButtonLink
            variant="link"
            to={to}
            onClick={onClick}
            size="xsmall"
            icon="east"
          >
            {linkText}
          </StyledButtonLink>
        ) : null)}
    </StyledContainer>
  )
}

ExtendedReminder.propTypes = {
  badgeText: PropTypes.string.isRequired,
  CustomLink: PropTypes.node,
  icon: PropTypes.oneOf(icons).isRequired,
  linkText: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  to: PropTypes.string,
  variant: PropTypes.oneOf(Object.keys(variants) as Variants[]),
}

export default ExtendedReminder
