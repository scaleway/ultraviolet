import { css } from '@emotion/core'
import PropTypes from 'prop-types'
import React from 'react'
import { theme } from '../../theme'
import { Badge } from '../Badge'
import { Box } from '../Box'
import { Button } from '../Button'
import { Icon } from '../Icon'
import { Typography } from '../Typography'

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

const styles = {
  container: variant => css`
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    position: relative;
    padding: 16px;
    background-color: ${variants[variant].background};
  `,
  badge: css`
    position: absolute;
    top: -12px;
    left: 16px;
    font-weight: 500;
    text-transform: uppercase;
  `,
  title: variant => css`
    font-weight: 600;
    text-transform: uppercase;
    color: ${variants[variant].main};
  `,
  link: css`
    margin-top: auto;
    color: ${theme.blue};
    background-color: ${theme.transparent};
    padding: 0;
    width: transparent;
    display: flex;
    align-items: center;
    justify-content: left;
    text-decoration: none;
    font-size: 14px;
  `,
}

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
  const badgeVariant = {
    warning: 'beta',
    error: 'error',
    info: 'info',
  }

  return (
    <Box css={styles.container(variant)} {...props}>
      <Box css={styles.badge}>
        <Badge size="sm" variant={badgeVariant[variant]}>
          <Icon mr="4px" color={theme.white} name={icon} size={16} />{' '}
          {badgeText}
        </Badge>
      </Box>
      <Typography mb={1} variant="bodyC" css={styles.title(variant)}>
        {title}
      </Typography>
      <Typography mb={1} variant="bodyD">
        {text}
      </Typography>
      <Button
        variant="link"
        to={to}
        onClick={onClick}
        size="xs"
        icon="east"
        css={styles.link}
      >
        {linkText}
      </Button>
    </Box>
  )
}

ExtendedReminder.propTypes = {
  variant: PropTypes.oneOf(['error', 'warning', 'info']),
  badgeText: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  to: PropTypes.string,
  onClick: PropTypes.func,
}

ExtendedReminder.defaultProps = {
  variant: 'info',
  to: null,
  onClick: null,
}

export { ExtendedReminder }
