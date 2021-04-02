import styled from '@emotion/styled'
import { darken, transparentize } from 'polished'
import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import { ActivityIndicator } from '../ActivityIndicator'
import { Box } from '../Box'
import Icon from '../Icon'
import { UniversalLink } from '../UniversalLink'

const borderedVariant = ({ theme: { colors }, color, bgColor, hoverColor }) => {
  const colorValue = colors[color]
  const bgColorValue = colors[bgColor]
  const hoverColorValue = colors[hoverColor]

  return `
    border: 1px solid ${colorValue};
    background-color: ${bgColorValue};
    color: ${colorValue};

    svg {
      fill: ${colorValue};
      // safari issue prevent event propgation
      pointer-events: none;
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

const plainVariant = ({ theme: { colors }, bgColor, textColor }) => {
  const bgColorValue = colors[bgColor]
  const textColorValue = colors[textColor]

  return `
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
  primary: ({ theme }) =>
    plainVariant({ theme, bgColor: 'primary', textColor: 'white' }),
  'primary-bordered': ({ theme }) =>
    borderedVariant({
      theme,
      color: 'primary',
      bgColor: 'white',
      hoverColor: 'primary',
    }),
  'primary-soft-bordered': ({ theme }) =>
    borderedVariant({
      theme,
      color: 'gray350',
      bgColor: 'white',
      hoverColor: 'primary',
    }),
  secondary: ({ theme }) =>
    plainVariant({ theme, bgColor: 'gray100', textColor: 'gray700' }),
  'secondary-bordered': ({ theme }) =>
    borderedVariant({
      theme,
      color: 'gray550',
      bgColor: 'white',
      hoverColor: 'primary',
    }),
  success: ({ theme }) =>
    plainVariant({ theme, bgColor: 'success', textColor: 'white' }),
  'success-bordered': ({ theme }) =>
    borderedVariant({
      theme,
      color: 'success',
      bgColor: 'white',
      hoverColor: 'success',
    }),
  'success-soft-bordered': ({ theme }) =>
    borderedVariant({
      theme,
      color: 'gray350',
      bgColor: 'white',
      hoverColor: 'success',
    }),
  warning: ({ theme }) =>
    plainVariant({ theme, bgColor: 'warning', textColor: 'white' }),
  'warning-bordered': ({ theme }) =>
    borderedVariant({
      theme,
      color: 'warning',
      bgColor: 'white',
      hoverColor: 'warning',
    }),
  'warning-soft-bordered': ({ theme }) =>
    borderedVariant({
      theme,
      color: 'gray350',
      bgColor: 'white',
      hoverColor: 'warning',
    }),
  info: ({ theme }) =>
    plainVariant({ theme, bgColor: 'zumthor', textColor: 'blue' }),
  'info-bordered': ({ theme }) =>
    borderedVariant({
      theme,
      color: 'blue',
      bgColor: 'white',
      hoverColor: 'blue',
    }),
  link: ({ theme: { colors } }) => `
    background-color: ${colors.white};
    color: ${colors.blue};
    vertical-align: baseline;
    font-weight: 400;

    &:hover,
    &:focus {
      color: ${darken(0.2, colors.blue)};
      text-decoration: underline;
    }
  `,
  transparent: ({ theme: { colors } }) => `
    background-color: transparent;
    color: ${colors.gray700};
  `,
}

export const buttonVariants = Object.keys(variants)

const sizes = {
  large: `
    font-size: 16px;
    line-height: 32px;
    font-weight: 500;
    padding: 8px 16px;
  `,
  medium: `
    font-size: 16px;
    line-height: 24px;
    padding: 8px 16px;
  `,
  small: `
    font-size: 16px;
    line-height: 16px;
    padding: 8px 16px;
  `,
  xsmall: `
    font-size: 14px;
    line-height: 20px;
    padding: 8px;
  `,
  xxsmall: `
    font-size: 12px;
  `,
}

export const buttonSizes = Object.keys(sizes)

const variantStyles = ({ variant, ...props }) => variants[variant]?.(props)
const sizeStyles = ({ size }) => sizes[size]

const StyledContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`

const StyledButton = styled(Box, {
  shouldForwardProp: prop => !['variant', 'extend', 'icon'].includes(prop),
})`
  display: inline-flex;
  border-radius: ${({ theme }) => theme.radii.default};
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

  ${variantStyles}
  ${sizeStyles}
  ${({ disabled, theme }) =>
    disabled &&
    `
    cursor: default;
    pointer-events: none;
    color: ${theme.colors.gray350};`}

  ${({ variant, disabled, theme }) =>
    variant !== 'link' &&
    disabled &&
    `
    background-color: ${theme.colors.gray50};
    border-color: ${theme.colors.gray50};
    box-shadow: none;
    `}

  ${({ extend, icon }) =>
    extend &&
    `
    display: inline-flex;
    & ${StyledContent} {
      transition: max-width 450ms ease, padding 150ms ease, margin 150ms ease;
      max-width: 0;
      margin-right: 0;
      ${icon ? 'padding-right: 0;' : 'padding-left: 0;'};
      overflow: hidden;
    }

    &:focus ${StyledContent},
    &:hover ${StyledContent} {
      max-width: 275px;
      margin-right: 8px;
      ${icon ? 'padding-right: 8x;' : 'padding-left: 8px;'};
    }
  `}
`

const StyledIconContainer = styled('div', {
  shouldForwardProp: prop => !['margin', 'position'].includes(prop),
})`
  display: flex;
  ${({ margin, position }) => `
    ${position === 'left' ? `margin-right: ${margin}px;` : ``}
    ${position === 'right' ? `margin-left: ${margin}px;` : ``}
    pointer-events: none;`}
`
function FwdButton({
  progress,
  disabled,
  variant,
  size,
  icon,
  iconPosition,
  children,
  extend,
  displayProgressOnly,
  type: elementType,
  innerRef,
  to,
  href,
  download,
  ...props
}) {
  const as = useMemo(() => {
    if (to) return UniversalLink
    if (href || download) return 'a'

    return 'button'
  }, [to, href, download])

  const type = as === 'button' ? elementType : null
  const iconMargin = extend || (progress && displayProgressOnly) ? 0 : 8

  const SmartIcon = () =>
    icon && typeof icon === 'string' ? <Icon name={icon} /> : icon

  return (
    <StyledButton
      {...props}
      href={href}
      to={to}
      download={download}
      ref={innerRef}
      type={type}
      as={as}
      disabled={as === 'button' && disabled}
      aria-disabled={disabled}
      variant={variant}
      size={size}
      extend={extend}
      icon={icon}
    >
      {progress === true ||
      progress === 'left' ||
      (icon && iconPosition === 'left') ? (
        <StyledIconContainer
          margin={iconMargin}
          position={children ? 'left' : ''}
        >
          {progress ? (
            <ActivityIndicator color="currentColor" size="1em" />
          ) : (
            <SmartIcon />
          )}
        </StyledIconContainer>
      ) : null}
      {(!progress || !displayProgressOnly) && children && (
        <StyledContent>{children}</StyledContent>
      )}
      {progress === 'right' || (icon && iconPosition === 'right') ? (
        <StyledIconContainer margin={iconMargin} position="right">
          {progress ? (
            <ActivityIndicator color="currentColor" size="1em" />
          ) : (
            <SmartIcon />
          )}
        </StyledIconContainer>
      ) : null}
    </StyledButton>
  )
}

const defaultProps = {
  children: null,
  download: undefined,
  disabled: false,
  displayProgressOnly: false,
  extend: undefined,
  href: undefined,
  icon: undefined,
  iconPosition: 'left',
  innerRef: undefined,
  progress: undefined,
  size: 'large',
  to: undefined,
  type: 'button',
  variant: 'primary',
}

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  download: PropTypes.string,
  disabled: PropTypes.bool,
  displayProgressOnly: PropTypes.bool,
  extend: PropTypes.bool,
  href: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.func]),
  iconPosition: PropTypes.oneOf(['left', 'right']),
  innerRef: PropTypes.func,
  progress: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['left', 'right']),
  ]),
  size: PropTypes.oneOf(buttonSizes),
  variant: PropTypes.oneOf(buttonVariants),
  to: PropTypes.string,
  type: PropTypes.string,
}

FwdButton.defaultProps = defaultProps

FwdButton.propTypes = propTypes

function forwardRef(props, ref) {
  return <FwdButton {...props} innerRef={ref} />
}

export const Button = React.forwardRef(forwardRef)

Button.defaultProps = defaultProps
Button.propTypes = propTypes

Button.displayName = 'fwd(Button)'
