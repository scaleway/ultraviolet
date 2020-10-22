import { css } from '@emotion/core'
import PropTypes from 'prop-types'
import React, { useRef, useState, useEffect } from 'react'
import { Box } from 'components/Box'
import { Tooltip } from 'components/Tooltip'
import {
  borderRadius,
  monospace,
  gray100,
  gray550,
  gray700,
  gray950,
} from 'theming'
import { cx, sp } from 'utils'

const styles = {
  default: p => css`
    color: ${gray700(p)};
    font-weight: 400;
    margin: 0;
  `,
  ellipsis: css`
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  `,
  tooltip: css`
    cursor: help;
  `,
  lead: p => css`
    color: ${gray950(p)};
    font-size: 25px;
    line-height: 25px;
  `,
}

const variants = {
  hero: {
    tag: 'h1',
    style: p => css`
      color: ${gray950(p)};
      font-size: 35px;
      line-height: 35px;
      margin-bottom: ${sp(9)(p)};
    `,
  },
  'lead-block': {
    tag: 'h2',
    style: [
      styles.lead,
      p => css`
        margin-bottom: ${sp(2)(p)};
        margin-top: ${sp(6)(p)};
      `,
    ],
  },
  'lead-text': {
    tag: 'h2',
    style: [
      styles.lead,
      p => css`
        margin-bottom: ${sp(3)(p)};
      `,
    ],
  },
  title: {
    tag: 'h3',
    style: p => css`
      color: ${gray950(p)};
      font-size: 21px;
      line-height: 24px;
    `,
  },
  bodyA: {
    tag: 'p',
    style: p => css`
      color: ${gray700(p)};
      font-size: 16px;
      line-height: 24px;
    `,
  },
  bodyB: {
    tag: 'p',
    style: p => css`
      color: ${gray550(p)};
      font-size: 14px;
      line-height: 18px;
    `,
  },
  bodyC: {
    tag: 'p',
    style: p => css`
      color: ${gray700(p)};
      font-size: 14px;
      line-height: 22px;
    `,
  },
  tiny: {
    tag: 'small',
    style: p => css`
      color: ${gray550(p)};
      font-size: 12px;
      line-height: 16px;
    `,
  },
  description: {
    description: 'p',
    style: p => css`
      color: ${gray950(p)};
      font-size: 16px;
      line-height: 24px;
      font-weight: 500;
    `,
  },
  samplecode: {
    tag: 'code',
    style: p => css`
      font-family: ${monospace(p)};
      border-radius: ${borderRadius(p)};
      background-color: ${gray100(p)};
      color: ${gray700(p)};
      font-size: 12px;
      line-height: 16px;
      padding: 4px;
    `,
  },
  command: {
    tag: 'code',
    style: p => css`
      font-family: ${monospace(p)};
      font-size: 13px;
      font-weight: 500;
      border-radius: ${borderRadius(p)};
      color: ${gray700(p)};
      background-color: ${gray100(p)};
      padding: 3px 5px;
    `,
  },
}

export const typographyVariants = Object.keys(variants)

export function Typography({
  variant,
  children,
  as,
  ellipsis,
  tooltipProps,
  ...props
}) {
  const ref = useRef()
  const [tooltip, setTooltip] = useState(false)
  useEffect(() => {
    if (ellipsis) {
      setTooltip(ref.current.offsetWidth < ref.current.scrollWidth)
    }
  }, [ellipsis])
  const variantConfig = variants[variant] || {}

  return (
    <Box
      ref={ref}
      as={as || variantConfig.tag}
      css={cx([
        styles.default,
        variantConfig.style,
        ellipsis && styles.ellipsis,
        tooltip && styles.tooltip,
      ])}
      {...props}
    >
      {tooltip && (
        <Tooltip {...tooltipProps} text={children}>
          {children}
        </Tooltip>
      )}
      {!tooltip && children}
    </Box>
  )
}

Typography.propTypes = {
  variant: PropTypes.oneOf(typographyVariants),
  ellipsis: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  tooltipProps: PropTypes.object,
}
