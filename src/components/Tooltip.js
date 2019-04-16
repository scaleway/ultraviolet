import React from 'react'
import { transparentize } from 'polished'
import { css } from '@emotion/core'
import { cx, sp } from 'utils'
import { gray950 } from 'theming'
import { Tooltip as SuiTooltip } from '@smooth-ui/core-em'

const style = p => {
  const bgColor = transparentize(0.1, gray950(p))
  return css`
    position: relative;
    white-space: pre-wrap;
    overflow-wrap: break-word;
    font-size: 13px;
    line-height: 16px;
    padding: ${sp(1)(p)};
    text-align: center;
    background-color: ${bgColor};
    max-width: 400px;

    &::after {
      content: '';
      position: absolute;
    }

    &[x-placement*='top'] {
      margin-bottom: 8px;
      &::after {
        border-top-color: ${bgColor};
        border-top-style: solid;
        border-top-width: 6px;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        bottom: -6px;
        left: 50%;
        margin-left: -8px;
      }
    }

    &[x-placement*='bottom'] {
      margin-top: 8px;

      &::after {
        border-bottom-color: ${bgColor};
        border-bottom-style: solid;
        border-bottom-width: 6px;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        top: -6px;
        left: 50%;
        margin-left: -8px;
      }
    }

    &[x-placement*='left'] {
      margin-right: 8px;

      &::after {
        border-left-color: ${bgColor};
        border-left-style: solid;
        border-left-width: 6px;
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
        right: -6px;
        top: 50%;
        margin-top: -8px;
      }
    }

    &[x-placement*='right'] {
      margin-left: 8px;

      &::after {
        border-right-color: ${bgColor};
        border-right-style: solid;
        border-right-width: 6px;
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
        left: -6px;
        top: 50%;
        margin-top: -8px;
      }
    }
  `
}

export function Tooltip(props) {
  return <SuiTooltip css={cx(style)} {...props} />
}
