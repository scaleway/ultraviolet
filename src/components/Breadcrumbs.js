import React, { cloneElement } from 'react'
import PropTypes from 'prop-types'
import flattenChildren from 'react-flatten-children'
import { css } from '@emotion/core'
import { Link } from './Link'
import { Typography } from './Typography'
import { Box } from './Box'

const styles = {
  ol: css`
    list-style: none;
    margin: 0;
    padding: 0;
  `,
  li: css`
    display: inline;

    &:not(:last-child)::after {
      content: '›';
      margin: 0 8px;
    }
  `,
}

function contractString(str) {
  if (typeof str === 'string' && str.length > 30) {
    return `${str.slice(0, 15)}...${str.slice(-15)}`
  }
  return str
}

export function Breadcrumbs({ children, ...props }) {
  const flatChildren = flattenChildren(children)
  const lastIndex = flatChildren.length - 1

  return (
    <Box as="nav" aria-label="Breadcrumb" {...props}>
      <Box css={styles.ol} as="ol">
        {flatChildren.map((child, index) => {
          if (!child) return null

          const active = lastIndex === index
          return (
            <React.Fragment key={child.key}>
              {cloneElement(child, {
                'aria-current': active ? 'page' : undefined,
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
}

Breadcrumbs.Item = function Item({ to, children, ...props }) {
  return (
    <Box css={styles.li} as="li" {...props}>
      {to ? (
        <Link variant="primary" to={to}>
          {contractString(children)}
        </Link>
      ) : (
        <Typography as="span" color="gray550">
          {contractString(children)}
        </Typography>
      )}
    </Box>
  )
}

Breadcrumbs.Item.propTypes = {
  to: PropTypes.string,
}
