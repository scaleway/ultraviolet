import { css } from '@emotion/core'
import React from 'react'
import { gray950, gray700, gray200, primary } from '../../theming'
import { cx, sp } from '../../utils'
import { Box } from '../Box'

const styles = {
  default: p => css`
    font-size: 16px;
    line-height: 16px;
    margin: 0;

    > dt {
      font-weight: 500;
      color: ${gray950(p)};
      &:after {
        content: ':';
      }
    }

    > dd {
      color: ${gray700(p)};
      margin: 0;
      margin-top: ${sp(1)(p)};
    }

    dd + dt {
      margin-top: ${sp(2)(p)};
    }
  `,
  inline: p => css`
    > dt {
      float: left;
      clear: left;
      margin-right: ${sp(1)(p)};
    }

    > dd {
      margin-top: 0;
    }

    dd + dt + dd {
      margin-top: ${sp(2)(p)};
    }
  `,
  selectable: p => css`
    > dd {
      user-select: all;

      &::selection {
        color: ${gray200(p)};
        background: ${primary(p)};
      }
    }
  `,
}

export function Description({ inline, selectable, ...props }) {
  return (
    <Box
      as="dl"
      css={cx([
        styles.default,
        inline && styles.inline,
        selectable && styles.selectable,
      ])}
      {...props}
    />
  )
}

Description.Term = function Term(props) {
  return <Box as="dt" {...props} />
}

Description.Desc = function Term(props) {
  return <Box as="dd" {...props} />
}
