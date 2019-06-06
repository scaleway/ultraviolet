import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { darken } from 'polished'
import { cx, useTheme } from 'utils'
import { blue, gray550, primary, white } from 'theming'
import { Icon } from './Icon'
import { Box } from './Box'

const ABSOLUTE_LINK_REGEXP = /^https?:\/\//
function needNativeLink(url) {
  if (!url) return false
  const isAbsolute = ABSOLUTE_LINK_REGEXP.test(url)
  const isAnchor = url[0] === '#'
  return isAbsolute || isAnchor
}

const variant = color => {
  return css`
    color: ${color};
    &:hover,
    &:focus {
      color: ${darken(0.2, color)};
    }
  `
}

const variants = {
  blue: p => variant(blue(p)),
  grey: p => variant(gray550(p)),
  primary: p => variant(primary(p)),
  white: p => variant(white(p)),
  inherit: css`
    color: inherit;
    &:hover,
    &:focus {
      color: inherit;
      text-decoration: none;
    }
  `,
}

export const linkVariants = Object.keys(variants)

const styles = {
  link: css`
    cursor: pointer;
    text-decoration: none;
    transition: color 200ms ease;
    &:hover,
    &:focus {
      text-decoration: underline;
    }
  `,
  openInNew: css`
    padding-left: 2px;
    opacity: 0.5;
  `,
}

export function Link({ variant, children, ...props }) {
  const { linkComponent = 'a' } = useTheme()
  const isBlank = props.target === '_blank'
  const rel = props.rel || (isBlank ? 'noopener noreferrer' : undefined)
  const href = props.to || props.href
  const as = props.as || (needNativeLink(props.to) ? 'a' : linkComponent)
  return (
    <Box
      css={cx([styles.link, variants[variant]])}
      {...props}
      as={as}
      href={href}
      rel={rel}
    >
      {children}
      {isBlank && (
        <Icon
          name="open-in-new"
          css={cx(styles.openInNew)}
          verticalAlign="top"
        />
      )}
    </Box>
  )
}

Link.propTypes = {
  variant: PropTypes.oneOf(linkVariants),
}
