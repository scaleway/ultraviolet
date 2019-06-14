import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { darken, transparentize } from 'polished'
import { cx, thColor } from 'utils'
import { borderRadius } from 'theming'
import { Box } from './Box'
import { Icon } from './Icon'
import { UniversalLink } from './UniversalLink'
import { ActivityIndicator } from './ActivityIndicator'

const plainVariant = (bgColor, textColor) => p => {
  const bgColorValue = thColor(bgColor)(p)
  const textColorValue = thColor(textColor)(p)
  return css`
    background-color: ${bgColorValue};
    color: ${textColorValue};

    &:hover,
    &:focus {
      color: ${textColorValue};
      background-color: ${darken(0.05, bgColorValue)};
    }

    &:focus {
      box-shadow: 0 0 0 2px ${transparentize(0.75, bgColorValue)};
    }
  `
}

const borderedVariant = (color, bgColor, hoverColor) => p => {
  const colorValue = thColor(color)(p)
  const bgColorValue = thColor(bgColor)(p)
  const hoverColorValue = thColor(hoverColor)(p)
  return css`
    border: 1px solid ${colorValue};
    background-color: ${bgColorValue};
    color: ${colorValue};

    svg {
      fill: ${colorValue};
    }

    &:hover,
    &:focus {
      border: 1px solid ${hoverColorValue};
      color: ${bgColorValue};
      background-color: ${hoverColorValue};

      svg {
        fill: ${bgColorValue};
      }
    }

    &:focus {
      box-shadow: 0 0 0 2px ${transparentize(0.75, hoverColorValue)};
    }
  `
}

const variants = {
  primary: plainVariant('primary', 'white'),
  'primary-bordered': borderedVariant('primary', 'white', 'primary'),
  'primary-soft-bordered': borderedVariant('gray350', 'white', 'primary'),
  success: plainVariant('success', 'white'),
  'success-bordered': borderedVariant('success', 'white', 'success'),
  'success-soft-bordered': borderedVariant('gray350', 'white', 'success'),
  warning: plainVariant('warning', 'white'),
  'warning-bordered': borderedVariant('warning', 'white', 'warning'),
  'warning-soft-bordered': borderedVariant('gray350', 'white', 'warning'),
  link: p => {
    const blueValue = thColor('blue')(p)
    return css`
      background-color: ${thColor('white')(p)};
      color: ${blueValue};

      &:hover,
      &:focus {
        color: ${darken(0.2, blueValue)};
        text-decoration: underline;
      }
    `
  },
  secondary: plainVariant('gray100', 'gray700'),
  transparent: p => css`
    background-color: transparent;
    color: ${thColor('gray700')(p)};
  `,
}

export const buttonVariants = Object.keys(variants)

const sizes = {
  lg: css`
    font-size: 16px;
    line-height: 32px;
    font-weight: 500;
    padding: 8px 12px;
    min-height: 48px;

    > .sc-btn-icon {
      font-size: 24px;
    }
  `,
  md: css`
    font-size: 16px;
    line-height: 24px;
    padding: 8px 10px;
    min-height: 40px;

    > .sc-btn-icon {
      font-size: 20px;
    }
  `,
  sm: css`
    font-size: 16px;
    line-height: 20px;
    padding: 6px 8px;
    min-height: 32px;

    > .sc-btn-icon {
      font-size: 20px;
    }
  `,
  xs: css`
    font-size: 14px;
    line-height: 16px;
    padding: 8px;
    min-height: 32px;

    > .sc-btn-icon {
      font-size: 16px;
    }
  `,
}

export const buttonSizes = Object.keys(sizes)

const styles = {
  button: p => css`
    display: inline-flex;
    border-radius: ${borderRadius(p)};
    border-width: 0;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    text-align: center;
    text-decoration: none;
    user-select: none;
    outline: none;
    vertical-align: middle;
    white-space: nowrap;
    font-weight: 500;
    transition: color 150ms ease-in-out, background-color 150ms ease-in-out,
      border-color 150ms ease-in-out;

    &:hover,
    &:focus {
      text-decoration: none;
    }
  `,
  content: css`
    height: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  icon: css`
    display: flex;
  `,
  disabled: p => css`
    cursor: default;
    pointer-events: none;
    background-color: ${thColor('gray50')(p)};
    color: ${thColor('gray350')(p)};
    border-color: ${thColor('gray50')(p)};
    box-shadow: none;
  `,
  extend: ({ icon }) => css`
    & .sc-ui-btn-content {
      transition: max-width 450ms ease, padding-left 450ms ease,
        padding-right 450ms ease;
      max-width: 0;
      overflow: hidden;
      padding-left: 0;
      padding-right: 0;
    }

    &:focus .sc-ui-btn-content,
    &:hover .sc-ui-btn-content {
      max-width: 200px;
      ${icon ? 'padding-left: 8px;' : null};
    }
  `,
}

export function Button({
  progress,
  as: asProp = 'button',
  disabled: disabledProp,
  variant = 'primary',
  size = 'lg',
  icon,
  children,
  extend,
  displayProgressOnly,
  type: typeProp = 'button',
  ...props
}) {
  const as = props.to
    ? UniversalLink
    : props.href || props.download
    ? 'a'
    : asProp
  const type = as === 'button' ? typeProp : null
  const disabled = Boolean(disabledProp || progress)
  const variantStyle = variants[variant]
  if (!variantStyle) {
    throw new Error(`Unknwown Button variant "${variant}"`)
  }
  const sizeStyle = sizes[size]
  if (!sizeStyle) {
    throw new Error(`Unknwown Button size "${size}"`)
  }
  const hasChildren = Boolean(children)
  return (
    <Box
      css={cx([
        styles.button,
        variantStyle,
        sizeStyle,
        disabled && styles.disabled,
        extend && styles.extend({ icon }),
      ])}
      type={type}
      as={as}
      disabled={as === 'button' ? disabled : undefined}
      {...props}
    >
      {progress === true || progress === 'left' || icon ? (
        <div className="sc-btn-icon" css={cx(styles.icon)}>
          {progress ? (
            <ActivityIndicator color="currentColor" size="1em" />
          ) : typeof icon === 'string' ? (
            <Icon name={icon} />
          ) : (
            icon
          )}
        </div>
      ) : null}

      {progress !== true && hasChildren && (
        <div
          css={cx(styles.content)}
          style={
            !extend
              ? {
                  paddingLeft: progress === 'left' || icon ? 8 : 0,
                }
              : undefined
          }
          className="sc-ui-btn-content"
        >
          {children}
        </div>
      )}
    </Box>
  )
}

Button.propTypes = {
  progress: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['left', 'right']),
  ]),
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf(buttonVariants),
  size: PropTypes.oneOf(buttonSizes),
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  children: PropTypes.node,
}
