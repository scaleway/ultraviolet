import { Theme, useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import {
  ComponentProps,
  FunctionComponent,
  MouseEventHandler,
  ReactNode,
} from 'react'
import Badge from '../Badge'
import Box from '../Box'
import Button from '../Button'
import Icon, { icons } from '../Icon'
import Typography from '../Typography'

export const variants = {
  error: ({ colors }: Theme) => ({
    background: colors.danger.background,
    main: colors.danger.text,
  }),
  info: ({ colors }: Theme) => ({
    background: colors.info.background,
    main: colors.info.text,
  }),
  success: ({ colors }: Theme) => ({
    background: colors.success.background,
    main: colors.neutral.text,
  }),
  warning: ({ colors }: Theme) => ({
    background: colors.warning.background,
    main: colors.warning.text,
  }),
} as const

type Variants = keyof typeof variants

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

const StyledBadgeContainer = styled.div`
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
  font-style: unset;
  text-transform: uppercase;
  color: ${({ theme, color }) => variants[color]?.(theme).main};
`

const StyledBadge = styled(Badge)`
  font-weight: 500;
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

type ExtendedReminderProps = {
  /**
   * The text to be placed in the top badge
   */
  badgeText: string
  /**
   * The icon to use in the badge
   */
  icon: ComponentProps<typeof Icon>['name']
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
        <StyledBadge size="small" variant={badgeVariant[variant]} as="strong">
          <Icon
            mr="4px"
            color={theme.colorsDeprecated.white}
            name={icon}
            size={16}
            aria-hidden="true"
          />
          {badgeText}
        </StyledBadge>
      </StyledBadgeContainer>
      <StyledTitle color={variant} mb={1} variant="bodyC" as="em">
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
