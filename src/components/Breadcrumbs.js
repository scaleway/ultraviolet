import { css } from '@emotion/core'
import { transparentize } from 'polished'
import PropTypes from 'prop-types'
import React, { cloneElement } from 'react'
import flattenChildren from 'react-flatten-children'
import { primary, white, gray350, gray550, success } from 'theming'
import { cx, sp } from 'utils'
import { Box } from './Box'
import { Link } from './Link'

const styles = {
  ol: css`
    list-style: none;
    margin: 0;
    padding: 0;

    /* bubble */
    display: flex;
  `,
}

function reverseZIndexes() {
  const count = 10
  return Array.from(
    { length: count },
    (_, index) => css`
      &:nth-child(${index + 1}) {
        z-index: ${count - index};
      }
    `,
  )
}

const variants = {
  link: p => css`
    display: inline;

    &[aria-current='page'] {
      color: ${gray550(p)};
    }

    &:not(:last-child)::after {
      content: '›';
      margin: 0 8px;
    }
  `,
  bubble: p => {
    const space = sp(3)(p)
    const doubleSpace = sp(6)(p)
    return css`
      display: flex;
      flex: 1;
      font-weight: 500;
      line-height: 24px;
      border-radius: 24px;
      border-style: solid;
      border-width: 1px;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding-top: 12px;
      padding-bottom: 12px;
      padding-left: ${doubleSpace};
      padding-right: ${space};
      margin-left: -${space};
      margin-right: -${space};

      background-color: ${success(p)};
      color: ${white(p)};
      border-color: ${white(p)};

      &:first-child {
        padding-left: ${space};
        margin-left: 0;
        margin-right: -${space};
      }

      &:last-child {
        margin-right: 0;
      }

      &[aria-current='page'] {
        background-color: ${primary(p)};
        color: ${white(p)};
        border-color: ${white(p)};

        &:focus {
          box-shadow: 0 0 0 2px ${transparentize(0.75, primary(p))};
        }
      }

      &[aria-current='page'] ~ & {
        background-color: ${white(p)};
        color: ${gray550(p)};
        border-color: ${gray350(p)};

        &:focus {
          box-shadow: 0 0 0 2px ${transparentize(0.75, gray550(p))};
        }
      }

      ${reverseZIndexes()}
    `
  },
}

function contractString(str) {
  if (typeof str === 'string' && str.length > 30) {
    return `${str.slice(0, 15)}...${str.slice(-15)}`
  }
  return str
}

export const breadcrumbsVariants = Object.keys(variants)

export function Breadcrumbs({
  children,
  variant = 'link',
  activeIndex: activeIndexProp,
  ...props
}) {
  const flatChildren = flattenChildren(children)
  const activeIndex =
    activeIndexProp !== undefined ? activeIndexProp : flatChildren.length - 1

  return (
    <Box as="nav" aria-label="Breadcrumb" {...props}>
      <Box css={styles.ol} as="ol">
        {flatChildren.map((child, index) => {
          if (!child) return null

          const active = activeIndex === index
          return (
            <React.Fragment key={child.key}>
              {cloneElement(child, {
                'aria-current': active ? 'page' : undefined,
                variant,
              })}
            </React.Fragment>
          )
        })}
      </Box>
    </Box>
  )
}

Breadcrumbs.propTypes = {
  children: PropTypes.node,
  as: PropTypes.string,
  variant: PropTypes.oneOf(breadcrumbsVariants),
}

Breadcrumbs.Item = function Item({ to, children, variant, ...props }) {
  return (
    <Box css={cx(variants[variant])} as="li" {...props}>
      {to ? (
        <Link variant="primary" to={to}>
          {contractString(children)}
        </Link>
      ) : (
        contractString(children)
      )}
    </Box>
  )
}

Breadcrumbs.Item.propTypes = {
  to: PropTypes.string,
}
