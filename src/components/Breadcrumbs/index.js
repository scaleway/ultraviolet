import { css } from '@emotion/react'
import { transparentize } from 'polished'
import PropTypes from 'prop-types'
import React, { cloneElement } from 'react'
import flattenChildren from 'react-flatten-children'
import { colors, space } from '../../new_theme'
import { Box } from '../Box'
import { Link } from '../Link'

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
  link: css`
    display: inline;

    &[aria-current='page'] {
      color: ${colors.gray550};
    }

    &:not(:last-child)::after {
      content: '›';
      margin: 0 8px;
    }
  `,
  bubble: css`
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
    padding-left: ${space['6']};
    padding-right: ${space['3']};
    margin-left: -${space['3']};
    margin-right: -${space['3']};

    background-color: ${colors.success};
    color: ${colors.white};
    border-color: ${colors.white};

    &:first-child {
      padding-left: ${space['3']};
      margin-left: 0;
      margin-right: -${space['3']};
    }

    &:last-child {
      margin-right: 0;
    }

    &[aria-current='page'] {
      background-color: ${colors.primary};
      color: ${colors.white};
      border-color: ${colors.white};

      &:focus {
        box-shadow: 0 0 0 2px ${transparentize(0.75, colors.primary)};
      }
    }

    &[aria-current='page'] ~ & {
      background-color: ${colors.white};
      color: ${colors.gray550};
      border-color: ${colors.gray350};

      &:focus {
        box-shadow: 0 0 0 2px ${transparentize(0.75, colors.gray550)};
      }
    }

    ${reverseZIndexes()}
  `,
}

function contractString(str) {
  if (typeof str === 'string' && str.length > 30) {
    return `${str.slice(0, 15)}...${str.slice(-15)}`
  }
  return str
}

export const breadcrumbsVariants = Object.keys(variants)

const Breadcrumbs = ({
  children,
  variant,
  activeIndex: activeIndexProp,
  ...props
}) => {
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
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(breadcrumbsVariants),
  activeIndex: PropTypes.number,
}

Breadcrumbs.defaultProps = {
  variant: 'link',
  activeIndex: undefined,
}

Breadcrumbs.Item = ({ to, children, variant, ...props }) => (
  <Box css={variants[variant]} as="li" {...props}>
    {to ? (
      <Link variant="primary" to={to}>
        {contractString(children)}
      </Link>
    ) : (
      contractString(children)
    )}
  </Box>
)

Breadcrumbs.Item.propTypes = {
  to: PropTypes.string,
  children: PropTypes.node.isRequired,
  variant: PropTypes.string,
}

Breadcrumbs.Item.defaultProps = {
  to: null,
  variant: 'link',
}

export { Breadcrumbs }
