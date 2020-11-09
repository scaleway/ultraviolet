import { css } from '@emotion/core'
import PropTypes from 'prop-types'
import React, { memo, useCallback, forwardRef } from 'react'
import recursivelyGetChildrenString from '../../helpers/recursivelyGetChildrenString'
import { theme } from '../../theme'
import { Box } from '../Box'
import { Tooltip } from '../Tooltip'

const styles = {
  main: css({
    color: theme.gray700,
    fontWeight: 400,
    marginBottom: 0,
    marginTop: 0,
  }),
  ellipsis: css({
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  }),
  hero: css({
    color: theme.gray950,
    fontSize: 35,
    lineHeight: '41px',
    marginBottom: 72,
  }),
  lead: css({
    color: theme.gray950,
    fontSize: 25,
    lineHeight: '25px',
    marginBottom: 0,
  }),
  'lead-block': css({
    marginBottom: 16,
    marginTop: 48,
  }),
  'lead-text': css({
    marginBottom: 24,
  }),
  title: css({
    color: theme.gray950,
    fontSize: 21,
    lineHeight: '24px',
  }),
  bodyA: css({
    color: theme.gray700,
    fontSize: 16,
    lineHeight: '24px',
  }),
  bodyB: css({
    color: theme.gray550,
    fontSize: 14,
    lineHeight: '18px',
  }),
  bodyC: css({
    color: theme.gray700,
    fontSize: 14,
    lineHeight: '22px',
  }),
  bodyD: css({
    color: theme.gray700,
    fontSize: 14,
    lineHeight: '20px',
  }),
  tiny: css({
    color: theme.gray550,
    fontSize: 12,
    lineHeight: '16px',
  }),
  description: css({
    color: theme.gray950,
    fontSize: 16,
    lineHeight: '24px',
    fontWeight: 500,
  }),
  samplecode: css({
    backgroundColor: theme.gray100,
    color: theme.gray700,
    fontSize: 12,
    lineHeight: '16px',
    padding: 4,
  }),
  badge: css({
    backgroundColor: theme.gray100,
    color: theme.gray700,
    textTransform: 'capitalize',
    letterSpacing: 1,
    fontWeight: 500,
    fontSize: 14,
    lineHeight: '16px',
    padding: '6px 12px',
    borderRadius: 20,
  }),
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
    font-family: ${theme.monospace};
    font-size: 13px;
    font-weight: 500;
    border-radius: ${theme.borderRadius};
    color: ${theme.gray700};
    background-color: ${theme.gray100};
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
  alert: theme.orange,
  white: theme.white,
  darkBlack: theme.gray950,
  lightBlack: theme.gray700,
  darkGrey: theme.gray550,
  grey: theme.gray350,
  light: theme.gray100,
  green: theme.green,
  red: theme.red,
  warning: theme.warning,
  blue: theme.blue,
  violet: theme.primary,
  primary: theme.primary,
  lightPrimary: theme.gray200,
}

const Typography = forwardRef(
  (
    {
      variant,
      children,
      as,
      color,
      align,
      lineHeight,
      maxLines = 0,
      ellipsis,
      fontWeight,
      ...props
    },
    ref,
  ) => {
    const variantStyles = ['lead-block', 'lead-text'].includes(variant)
      ? [styles.lead, styles[variant]]
      : [styles[variant]]

    const finalStringChildren = recursivelyGetChildrenString(children)

    function Text({
      onMouseEnter = undefined,
      onFocus = undefined,
      tooltipProps = {},
    }) {
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
            color && css({ color: textColors[color] }),
            align && css({ textAlign: align }),
            ellipsis && styles.ellipsis,
            lineHeight && css({ lineHeight }),
            fontWeight && css({ fontWeight }),
            maxLines && maxLines > 0 && styles.clamp(maxLines),
          ]}
        >
          {children}
        </Box>
      )
    }

    function TextWithTooltip() {
      const isTruncated = useCallback((target = {}) => {
        // If the text is really truncated
        const { offsetWidth, scrollWidth } = target
        return offsetWidth < scrollWidth
      }, [])

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
            />
          )}
        </Tooltip>
      )
    }
    return ellipsis ? <TextWithTooltip /> : <Text />
  },
)

const typographyVariants = Object.keys(variantTags)

Typography.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(typographyVariants).isRequired,
  as: PropTypes.string,
  color: PropTypes.oneOf(Object.keys(textColors)),
  align: PropTypes.string,
  ellipsis: PropTypes.bool,
  maxLines: PropTypes.number,
  lineHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fontWeight: PropTypes.number,
}

Typography.defaultProps = {
  as: null,
  color: null,
  align: null,
  ellipsis: false,
  maxLines: 0,
  lineHeight: null,
  fontWeight: null,
}

const MemoizedTypography = memo(Typography)

export { MemoizedTypography as Typography, typographyVariants }
