import { css } from '@emotion/react'
import React from 'react'
import { colors, space } from '../../new_theme'
import { Box } from '../Box'

const styles = {
  default: css`
    font-size: 16px;
    line-height: 16px;
    margin: 0;

    > dt {
      font-weight: 500;
      color: ${colors.gray950};
      &:after {
        content: ':';
      }
    }

    > dd {
      color: ${colors.gray700};
      margin: 0;
      margin-top: ${space['1']};
    }

    dd + dt {
      margin-top: ${space['2']};
    }
  `,
  inline: css`
    > dt {
      float: left;
      clear: left;
      margin-right: ${space['1']};
    }

    > dd {
      margin-top: 0;
    }

    dd + dt + dd {
      margin-top: ${space['2']};
    }
  `,
  selectable: css`
    > dd {
      user-select: all;

      &::selection {
        color: ${colors.gray200};
        background: ${colors.primary};
      }
    }
  `,
}

export function Description({ inline, selectable, ...props }) {
  return (
    <Box
      as="dl"
      css={[
        styles.default,
        inline && styles.inline,
        selectable && styles.selectable,
      ]}
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
