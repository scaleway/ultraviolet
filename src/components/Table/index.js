import { css } from '@emotion/core'
import PropTypes from 'prop-types'
import React from 'react'
import { gray50, gray350, gray550, gray700, primary } from 'theming'
<<<<<<< HEAD:src/components/Table.js
import { cx, sp } from 'utils'
import { ActivityIndicator } from './ActivityIndicator'
import { Box } from './Box'
=======
import { ActivityIndicator } from 'components/ActivityIndicator'
import { Box } from 'components/Box'
>>>>>>> feat: migrate to storybook:src/components/Table/index.js

const styles = {
  cell: p => css`
    padding: ${sp(1.5)(p)} ${sp(2)(p)};
    font-size: 14px;
    line-height: 24px;
  `,
  th: p => css`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 400;
    color: ${gray550(p)};
    text-align: left;
  `,
  td: css`
    overflow: hidden;
    white-space: nowrap;
  `,
  table: css`
    table-layout: fixed;
    width: 100%;
    border-collapse: collapse;
  `,
  thead: p => css`
    border: 0;
    border-bottom-width: 1px;
    border-color: ${gray350(p)};
    border-style: solid;
  `,
  tr: p => css`
    color: ${gray700(p)};

    a {
      color: inherit;
    }

    &:nth-of-type(even) {
      background-color: ${gray50(p)};
    }

    &:hover {
      color: ${primary(p)};

      td:first-of-type {
        font-weight: 500;
        text-decoration: underline;
      }
    }

    [data-visibility='hover'] {
      transition: opacity 150ms;
      opacity: 0;
      pointer-events: none;
    }

    &:hover [data-visibility='hover'] {
      opacity: 1;
      pointer-events: auto;
    }
  `,
  activityIndicator: p => css`
    position: absolute;
    top: ${sp(1)(p)};
    left: calc(50% - 20px);
  `,
}

export function Table(props) {
  return <Box as="table" css={cx(styles.table)} {...props} />
}

Table.Thead = function Thead(props) {
  return <Box as="thead" css={cx(styles.head)} {...props} />
}

Table.Tbody = function Tbody({ progress, colSpan, children, ...props }) {
  return (
    <Box as="tbody" {...props}>
      {progress ? (
        <Table.Tr>
          <Table.Td position="relative" height={80} colSpan={colSpan}>
            <ActivityIndicator css={cx(styles.activityIndicator)} size={40} />
          </Table.Td>
        </Table.Tr>
      ) : (
        children
      )}
    </Box>
  )
}

Table.Tbody.propTypes = {
  colSpan: PropTypes.number,
  progress: PropTypes.bool,
}

Table.Tr = function Tr(props) {
  return <Box as="tr" css={cx(styles.tr)} {...props} />
}

Table.Th = function Th({ children, ...props }) {
  return (
    <Box as="th" css={cx([styles.cell, styles.th])} {...props}>
      {children}
    </Box>
  )
}

Table.Td = function Td(props) {
  return <Box as="td" css={cx([styles.cell, styles.td])} {...props} />
}
