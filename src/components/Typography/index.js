import { css } from '@emotion/react'
import PropTypes from 'prop-types'
import React, { forwardRef, memo, useCallback } from 'react'
import recursivelyGetChildrenString from '../../helpers/recursivelyGetChildrenString'
import { colors, fonts, radii } from '../../theme'
import { Box } from '../Box'
import Tooltip from '../Tooltip'

const styles = {
  main: css`
    color: ${colors.gray700};
    font-weight: 400;
    margin-bottom: 0;
    margin-top: 0;
  `,
  ellipsis: css`
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  `,
  hero: css`
    color: ${colors.gray950};
    font-size: 35px;
    line-height: 41px;
    margin-bottom: 72px;
  `,
  lead: css`
    color: ${colors.gray950};
    font-size: 25px;
    line-height: 25px;
    margin-bottom: 0;
  `,
  'lead-block': css`
    margin-bottom: 16px;
    margin-top: 48px;
  `,
  'lead-text': css`
    margin-bottom: 24px;
  `,
  title: css`
    color: ${colors.gray950};
    font-size: 21px;
    line-height: 24px;
  `,
  bodyA: css`
    color: ${colors.gray700};
    font-size: 16px;
    line-height: 24px;
  `,
  bodyB: css`
    color: ${colors.gray550};
    font-size: 14px;
    line-height: 18px;
  `,
  bodyC: css`
    color: ${colors.gray700};
    font-size: 14px;
    line-height: 22px;
  `,
  bodyD: css`
    color: ${colors.gray700};
    font-size: 14px;
    line-height: 20px;
  `,
  tiny: css`
    color: ${colors.gray550};
    font-size: 12px;
    line-height: 16px;
  `,
  description: css`
    color: ${colors.gray950};
    font-size: 16px;
    line-height: 24px;
    font-weight: 500;
  `,
  samplecode: css`
    background-color: ${colors.gray100};
    color: ${colors.gray700};
    font-size: 12px;
    line-height: 16px;
    padding: 4px;
  `,
  badge: css`
    background-color: ${colors.gray100};
    color: ${colors.gray700};
    text-transform: capitalize;
    letter-spacing: 1px;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    padding: 6px 12px;
    border-radius: 20px;
  `,
  link: css`
    color: #3f6ed8;
    :hover {
      text-decoration: underline;
    }
  `,
  clamp: maxLines => css`
    -webkit-line-clamp: ${maxLines};
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  `,
  command: css`
    font-family: ${fonts.monospace};
    font-size: 13px;
    font-weight: 500;
    border-radius: ${radii.default};
    color: ${colors.gray700};
    background-color: ${colors.gray100};
    padding: 3px 5px;
  `,
}

const variantTags = {
  default: 'div',
  hero: 'h1',
  lead: 'h2',
  'lead-block': 'h2',
  'lead-text': 'h2',
  title: 'h3',
  bodyA: 'p',
  bodyB: 'p',
  bodyC: 'p',
  bodyD: 'p',
  tiny: 'small',
  samplecode: 'code',
  command: 'code',
  description: 'p',
  link: 'div',
}

const textColors = {
  inherit: 'inherit',
  alert: colors.orange,
  white: colors.white,
  darkBlack: colors.gray950,
  lightBlack: colors.gray700,
  darkGrey: colors.gray550, // TODO: deprecated, to be removed soon
  grey: colors.gray350, // TODO: deprecated, to be removed soon
  darkGray: colors.gray550,
  gray: colors.gray350,
  light: colors.gray100,
  green: colors.green,
  red: colors.red,
  warning: colors.warning,
  blue: colors.blue,
  violet: colors.primary,
  primary: colors.primary,
  lightPrimary: colors.gray200,
  gold: colors.gold,
  info: colors.info,
}

const Text = ({
  onMouseEnter = undefined,
  onFocus = undefined,
  tooltipProps = {},
  variant,
  children,
  as,
  color,
  align,
  lineHeight,
  maxLines = 0,
  ellipsis,
  fontWeight,
  ref,
  ...props
}) => {
  const variantStyles = ['lead-block', 'lead-text'].includes(variant)
    ? [styles.lead, styles[variant]]
    : [styles[variant]]

  return (
    <Box
      ref={ref}
      onMouseEnter={onMouseEnter}
      onFocus={onFocus}
      {...tooltipProps}
      {...props}
      as={as || variantTags[variant]}
      css={[
        styles.main,
        ...variantStyles,
        color &&
          css`
            color: ${textColors[color]};
          `,
        align &&
          css`
            text-align: align;
          `,
        ellipsis && styles.ellipsis,
        lineHeight &&
          css`
            line-height: ${lineHeight};
          `,
        fontWeight &&
          css`
            font-weight: ${fontWeight};
          `,
        maxLines && maxLines > 0 && styles.clamp(maxLines),
      ]}
    >
      {children}
    </Box>
  )
}

const TextWithTooltip = props => {
  const isTruncated = useCallback((target = {}) => {
    // If the text is really truncated
    const { offsetWidth, scrollWidth } = target

    return offsetWidth < scrollWidth
  }, [])

  const finalStringChildren = recursivelyGetChildrenString(props.children)

  return (
    <Tooltip text={finalStringChildren} maxWidth={650}>
      {({
        width,
        onMouseEnter = () => {},
        onFocus = () => {},
        ...tooltipProps
      }) => (
        <Text
          onMouseEnter={ev => {
            if (isTruncated(ev.currentTarget)) {
              onMouseEnter(ev)
            }
          }}
          onFocus={ev => {
            if (isTruncated(ev.currentTarget)) {
              onFocus(ev)
            }
          }}
          tooltipProps={tooltipProps}
          {...props}
        />
      )}
    </Tooltip>
  )
}

TextWithTooltip.propTypes = {
  children: PropTypes.node.isRequired,
}

const Typography = forwardRef((props, ref) => {
  const Component = props.ellipsis ? TextWithTooltip : Text

  return <Component ref={ref} {...props} />
})

const typographyVariants = Object.keys(variantTags)

Typography.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(typographyVariants),
  as: PropTypes.string,
  color: PropTypes.oneOf(Object.keys(textColors)),
  align: PropTypes.string,
  ellipsis: PropTypes.bool,
  maxLines: PropTypes.number,
  lineHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fontWeight: PropTypes.number,
  onMouseEnter: PropTypes.func,
  onFocus: PropTypes.func,
  tooltipProps: PropTypes.shape({}),
}
Text.propTypes = Typography.propTypes

Typography.defaultProps = {
  as: null,
  color: null,
  align: null,
  ellipsis: false,
  maxLines: 0,
  lineHeight: null,
  fontWeight: null,
  variant: 'default',
  onMouseEnter: undefined,
  onFocus: undefined,
  tooltipProps: {},
}

Typography.defaultProps = Text.defaultProps

const MemoizedTypography = memo(Typography)

export { MemoizedTypography as Typography, typographyVariants }
