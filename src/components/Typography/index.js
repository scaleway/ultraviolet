import { css } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, { forwardRef, memo, useCallback } from 'react'
import recursivelyGetChildrenString from '../../helpers/recursivelyGetChildrenString'
import { colors } from '../../theme'
import Box from '../Box'
import Tooltip from '../Tooltip'

const styles = {
  ellipsis: () => css`
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  `,
  hero: ({ theme }) => css`
    color: ${theme.colors.gray950};
    font-size: 35px;
    line-height: 41px;
    margin-bottom: 72px;
  `,
  lead: ({ theme }) => css`
    color: ${theme.colors.gray950};
    font-size: 25px;
    line-height: 25px;
    margin-bottom: 0;
  `,
  'lead-block': () => css`
    margin-bottom: 16px;
    margin-top: 48px;
  `,
  'lead-text': () => css`
    margin-bottom: 24px;
  `,
  title: ({ theme }) => css`
    color: ${theme.colors.gray950};
    font-size: 21px;
    line-height: 24px;
  `,
  bodyA: ({ theme }) => css`
    color: ${theme.colors.gray700};
    font-size: 16px;
    line-height: 24px;
  `,
  bodyB: ({ theme }) => css`
    color: ${theme.colors.gray550};
    font-size: 14px;
    line-height: 18px;
  `,
  bodyC: ({ theme }) => css`
    color: ${theme.colors.gray700};
    font-size: 14px;
    line-height: 22px;
  `,
  bodyD: ({ theme }) => css`
    color: ${theme.colors.gray700};
    font-size: 14px;
    line-height: 20px;
  `,
  tiny: ({ theme }) => css`
    color: ${theme.colors.gray550};
    font-size: 12px;
    line-height: 16px;
  `,
  description: ({ theme }) => css`
    color: ${theme.colors.gray950};
    font-size: 16px;
    line-height: 24px;
    font-weight: 500;
  `,
  samplecode: ({ theme }) => css`
    background-color: ${theme.colors.gray100};
    color: ${theme.colors.gray700};
    font-size: 12px;
    line-height: 16px;
    padding: 4px;
  `,
  badge: ({ theme }) => css`
    background-color: ${theme.colors.gray100};
    color: ${theme.colors.gray700};
    text-transform: capitalize;
    letter-spacing: 1px;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    padding: 6px 12px;
    border-radius: 20px;
  `,
  link: () => css`
    color: #3f6ed8;
    :hover {
      text-decoration: underline;
    }
  `,
  clamp: ({ maxLines }) => css`
    -webkit-line-clamp: ${maxLines};
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  `,
  command: ({ theme }) => css`
    font-family: ${theme.fonts.monospace};
    font-size: 13px;
    font-weight: 500;
    border-radius: ${theme.radii.default};
    color: ${theme.colors.gray700};
    background-color: ${theme.colors.gray100};
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

const colorStyles = ({ theme, color }) =>
  color
    ? css`
        color: ${theme.colors[color] ?? color};
      `
    : undefined

const variantStyles = ({ theme, variant }) =>
  ['lead-block', 'lead-text'].includes(variant)
    ? css`
        ${styles.lead({ theme })}
        ${styles[variant]?.({ theme })}
      `
    : css`
        ${styles[variant]?.({ theme })}
      `

const StyledText = styled(Box, {
  shouldForwardProp: prop =>
    !['ellipsis', 'variant', 'maxLines'].includes(prop),
})`
  color: ${({ theme }) => theme.colors.gray700};
  font-weight: 400;
  margin-bottom: 0;
  margin-top: 0;

  ${variantStyles}
  ${colorStyles}

    ${({ ellipsis, theme }) => ellipsis && styles.ellipsis({ theme })}
    ${({ maxLines }) => !!maxLines && styles.clamp({ maxLines })}
`

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
}) => (
  <StyledText
    ref={ref}
    onMouseEnter={onMouseEnter}
    onFocus={onFocus}
    {...tooltipProps}
    {...props}
    as={as || variantTags[variant]}
    color={color}
    variant={variant}
    align={align}
    ellipsis={ellipsis}
    lineHeight={lineHeight}
    fontWeight={fontWeight}
    maxLines={maxLines}
  >
    {children}
  </StyledText>
)

const TextWithTooltip = ({ children, ...props }) => {
  const isTruncated = useCallback((target = {}) => {
    // If the text is really truncated
    const { offsetWidth, scrollWidth } = target

    return offsetWidth < scrollWidth
  }, [])

  const finalStringChildren = recursivelyGetChildrenString(children)

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
        >
          {children}
        </Text>
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

export const typographyVariants = Object.keys(variantTags)

Typography.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(typographyVariants),
  as: PropTypes.string,
  color: PropTypes.oneOf(Object.keys(colors)),
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

export default MemoizedTypography
