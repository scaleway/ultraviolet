import { css } from '@emotion/react'
import { darken } from 'polished'
import PropTypes from 'prop-types'
import React from 'react'
import { blue, gray550, primary, white } from '../../theming'
import { cx } from '../../utils'
import { Icon } from '../Icon'
import { UniversalLink } from '../UniversalLink'

const variant = color => css`
  color: ${color};
  &:hover,
  &:focus {
    color: ${darken(0.2, color)};
  }
`

const variants = {
  blue: p => variant(blue(p)),
  grey: p => variant(gray550(p)),
  white: p => variant(white(p)),
  primary: p => css`
    color: ${primary(p)};
    &:hover,
    &:focus {
      color: ${primary(p)};
    }
  `,
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
  const isBlank = props.target === '_blank'
  return (
    <UniversalLink css={cx([styles.link, variants[variant]])} {...props}>
      {children}
      {isBlank && (
        <Icon
          name="open-in-new"
          css={cx(styles.openInNew)}
          verticalAlign="top"
        />
      )}
    </UniversalLink>
  )
}

Link.propTypes = {
  variant: PropTypes.oneOf(linkVariants),
}
