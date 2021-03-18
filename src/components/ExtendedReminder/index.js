import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'
import Badge from '../Badge'
import { Box } from '../Box'
import { Button } from '../Button'
import Icon from '../Icon'
import { Typography } from '../Typography'

const variants = {
  error: ({ colors }) => ({
    main: colors.red,
    background: colors.pippin,
  }),
  warning: ({ colors }) => ({
    main: colors.orange,
    background: colors.serenade,
  }),
  info: ({ colors }) => ({
    main: colors.blue,
    background: colors.zumthor,
  }),
  success: ({ colors }) => ({
    main: colors.gray700,
    background: colors.foam,
  }),
}

const StyledContainer = styled(Box, {
  shouldForwardProp: prop => !['variant'].includes(prop),
})(
  ({ theme, variant }) => `
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    position: relative;
    padding: 16px;
    background-color: ${variants[variant]?.(theme).background};
`,
)

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
  icon,
  badgeText,
  title,
  text,
  linkText,
  to,
  onClick,
  variant,
  ...props
}) => {
  const theme = useTheme()
  const badgeVariant = {
    warning: 'beta',
    error: 'error',
    info: 'info',
    success: 'success',
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
  variant: PropTypes.oneOf(Object.keys(variants)),
  badgeText: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  linkText: PropTypes.string,
  to: PropTypes.string,
  onClick: PropTypes.func,
}

ExtendedReminder.defaultProps = {
  variant: 'info',
  to: null,
  onClick: null,
  linkText: null,
}

export default ExtendedReminder
