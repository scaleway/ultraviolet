import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'
import Badge from '../Badge'
import Box from '../Box'
import Button from '../Button'
import Icon from '../Icon'
import Typography from '../Typography'

const variants = {
  error: ({ colors }) => ({
    background: colors.pippin,
    main: colors.red,
  }),
  info: ({ colors }) => ({
    background: colors.zumthor,
    main: colors.blue,
  }),
  success: ({ colors }) => ({
    background: colors.foam,
    main: colors.gray700,
  }),
  warning: ({ colors }) => ({
    background: colors.serenade,
    main: colors.orange,
  }),
}

const StyledContainer = styled(Box, {
  shouldForwardProp: prop => !['variant'].includes(prop),
})`
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
  shouldForwardProp: prop => !['color'].includes(prop),
})`
  font-weight: 600;
  text-transform: uppercase;
  color: ${({ theme, color }) => variants[color]?.(theme).main};
`

const StyledButtonLink = styled(Button)`
  margin-top: auto;
  color: ${({ theme: { colors } }) => colors.blue};
  background-color: ${({ theme: { colors } }) => colors.transparent};
  padding: 0;
  width: transparent;
  display: flex;
  align-items: center;
  justify-content: left;
  text-decoration: none;
  font-size: 14px;
`

const ExtendedReminder = ({
  badgeText,
  icon,
  linkText,
  onClick,
  text,
  title,
  to,
  variant,
  ...props
}) => {
  const theme = useTheme()
  const badgeVariant = {
    error: 'error',
    info: 'info',
    success: 'success',
    warning: 'beta',
  }

  return (
    <StyledContainer variant={variant} {...props}>
      <StyledBadgeContainer>
        <Badge size="small" variant={badgeVariant[variant]}>
          <Icon mr="4px" color={theme.colors.white} name={icon} size={16} />
          {badgeText}
        </Badge>
      </StyledBadgeContainer>
      <StyledTitle color={variant} mb={1} variant="bodyC">
        {title}
      </StyledTitle>
      <Typography mb={1} variant="bodyD">
        {text}
      </Typography>
      {linkText && (
        <StyledButtonLink
          variant="link"
          to={to}
          onClick={onClick}
          size="xsmall"
          icon="east"
        >
          {linkText}
        </StyledButtonLink>
      )}
    </StyledContainer>
  )
}

ExtendedReminder.propTypes = {
  /**
   * The text to be placed in the top badge
   */
  badgeText: PropTypes.string.isRequired,
  /**
   * The icon to use in the badge
   */
  icon: PropTypes.string.isRequired,
  /**
   * The link text to display at the end
   */
  linkText: PropTypes.string,
  /**
   * MouseEvent listener on the component
   */
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  /**
   * The link that linkText prop need to redirect to.
   */
  to: PropTypes.string,
  variant: PropTypes.oneOf(Object.keys(variants)),
}

ExtendedReminder.defaultProps = {
  linkText: null,
  onClick: null,
  to: null,
  variant: 'info',
}

export default ExtendedReminder
