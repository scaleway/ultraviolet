import { css } from '@emotion/core'
import { darken, transparentize } from 'polished'
import PropTypes from 'prop-types'
import React from 'react'
import { borderRadius, white, gray50, gray350, gray700 } from 'theming'
import { cx, thColor } from 'utils'
import { ActivityIndicator } from 'components/ActivityIndicator'
import { Box } from 'components/Box'
import { Icon } from 'components/Icon'
import { UniversalLink } from 'components/UniversalLink'

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

const variants = {
  primary: plainVariant('primary', 'white'),
  'primary-bordered': borderedVariant('primary', 'white', 'primary'),
  'primary-soft-bordered': borderedVariant('gray350', 'white', 'primary'),
  secondary: plainVariant('gray100', 'gray700'),
  'secondary-bordered': borderedVariant('gray550', 'white', 'primary'),
  success: plainVariant('success', 'white'),
  'success-bordered': borderedVariant('success', 'white', 'success'),
  'success-soft-bordered': borderedVariant('gray350', 'white', 'success'),
  warning: plainVariant('warning', 'white'),
  'warning-bordered': borderedVariant('warning', 'white', 'warning'),
  'warning-soft-bordered': borderedVariant('gray350', 'white', 'warning'),
  info: plainVariant('zumthor', 'blue'),
  'info-bordered': borderedVariant('blue', 'white', 'blue'),
  link: p => {
    const blueValue = thColor('blue')(p)
    return css`
      background-color: ${white(p)};
      color: ${blueValue};
      vertical-align: baseline;
      font-weight: 400;

      &:hover,
      &:focus {
        color: ${darken(0.2, blueValue)};
        text-decoration: underline;
      }
    `
  },
  transparent: p => css`
    background-color: transparent;
    color: ${gray700(p)};
  `,
}

export const buttonVariants = Object.keys(variants)

const sizes = {
  lg: css`
    font-size: 16px;
    line-height: 32px;
    font-weight: 500;
    padding: 8px 16px;
  `,
  md: css`
    font-size: 16px;
    line-height: 24px;
    padding: 8px 16px;
  `,
  sm: css`
    font-size: 16px;
    line-height: 16px;
    padding: 8px 16px;
  `,
  xs: css`
    font-size: 14px;
    line-height: 20px;
    padding: 8px;
  `,
  xxs: css`
    font-size: 12px;
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
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  icon: (margin, position) => css`
    ${position === 'left'
      ? css`
          margin-right: ${margin}px;
        `
      : position === 'right' &&
        css`
          margin-left: ${margin}px;
        `}
    pointer-events: none;
  `,
  disabled: ({ variant }) => p => css`
    cursor: default;
    pointer-events: none;
    color: ${gray350(p)};

    ${variant !== 'link' &&
    css`
      background-color: ${gray50(p)};
      border-color: ${gray50(p)};
      box-shadow: none;
    `}
  `,
  extend: icon => css`
    & .content {
      transition: max-width 450ms ease, padding 150ms ease, margin 150ms ease;
      max-width: 0;
      margin-right: 0;
      ${icon ? 'padding-right: 0;' : 'padding-left: 0;'};
      overflow: hidden;
    }

    &:focus .content,
    &:hover .content {
      max-width: 275px;
      margin-right: 8px;
      ${icon ? 'padding-right: 8x;' : 'padding-left: 8px;'};
    }
  `,
}

function FwdButton({
  progress,
  disabled,
  variant = 'primary',
  size = 'lg',
  icon,
  iconPosition = 'left',
  children,
  extend,
  displayProgressOnly,
  type: elementType = 'button',
  innerRef,
  ...props
}) {
  const as = props.to
    ? UniversalLink
    : props.href || props.download
    ? 'a'
    : 'button'
  const type = as === 'button' ? elementType : null
  const iconMargin = extend || (progress && displayProgressOnly) ? 0 : 8
  const SmartIcon = () =>
    icon && typeof icon === 'string' ? <Icon name={icon} /> : icon

  return (
    <Box
      {...props}
      ref={innerRef}
      type={type}
      as={as}
      disabled={as === 'button' && disabled}
      aria-disabled={disabled}
      css={cx([
        styles.button,
        variants[variant],
        sizes[size],
        disabled && styles.disabled(variant),
        extend && styles.extend(icon),
      ])}
    >
      {progress === true ||
      progress === 'left' ||
      (icon && iconPosition === 'left') ? (
        <Box
          display="flex"
          css={styles.icon(iconMargin, children ? 'left' : '')}
        >
          {progress ? (
            <ActivityIndicator color="currentColor" size="1em" />
          ) : (
            <SmartIcon />
          )}
        </Box>
      ) : null}
      {(!progress || !displayProgressOnly) && children && (
        <div css={styles.content} className="content">
          {children}
        </div>
      )}
      {progress === 'right' || (icon && iconPosition === 'right') ? (
        <Box display="flex" css={styles.icon(iconMargin, 'right')}>
          {progress ? (
            <ActivityIndicator color="currentColor" size="1em" />
          ) : (
            <SmartIcon />
          )}
        </Box>
      ) : null}
    </Box>
  )
}

FwdButton.propTypes = {
  as: PropTypes.node,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  displayProgressOnly: PropTypes.bool,
  extend: PropTypes.bool,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  iconPosition: PropTypes.oneOf(['left', 'right']),
  progress: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['left', 'right']),
  ]),
  size: PropTypes.oneOf(buttonSizes),
  tooltip: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  variant: PropTypes.oneOf(buttonVariants),
}

function forwardRef(props, ref) {
  return <FwdButton {...props} innerRef={ref} />
}

export const Button = React.forwardRef(forwardRef)
Button.displayName = 'fwd(Button)'
