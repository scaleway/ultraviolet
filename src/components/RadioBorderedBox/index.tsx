import styled from '@emotion/styled'
import { transparentize } from 'polished'
import PropTypes from 'prop-types'
import React, { FunctionComponent, InputHTMLAttributes, ReactNode } from 'react'
import Badge, { badgeSizes, badgeVariants } from '../Badge'
import type { Sizes, Variants } from '../Badge'
import Box, { XStyledProps } from '../Box'
import Radio from '../Radio'

const StyledBox = styled(Box)<{ disabled: boolean; checked: boolean }>`
  ${({ disabled, checked, theme: { colors } }) => {
    if (disabled)
      return `
        cursor: not-allowed !important;
        color: ${colors.gray300};
      `
    if (checked)
      return `
        border: 1px solid ${colors.primary} !important;
        box-shadow: 0 0 0 2px ${transparentize(0.75, colors.primary)};
      `

    return null
  }}
`

type RadioBorderedBoxProps = {
  badgeSize?: Sizes
  badgeText?: string
  badgeVariant?: Variants
  children: ReactNode
  label: ReactNode
  labelDescription?: string
  name: string
  size?: number
  value: string | number
} & InputHTMLAttributes<HTMLInputElement> &
  XStyledProps

const RadioBorderedBox: FunctionComponent<RadioBorderedBoxProps> = ({
  label,
  labelDescription,
  badgeText,
  badgeSize = 'xsmall',
  badgeVariant = 'info',
  checked = false,
  onChange,
  onFocus,
  onBlur,
  disabled = false,
  name,
  value,
  size = 24,
  children,
  ...props
}) => (
  <StyledBox
    bordered
    display="block"
    disabled={disabled}
    checked={checked}
    {...props}
  >
    <Box display="flex" alignItems="center" mb={1}>
      <Radio
        name={name}
        checked={checked}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
        value={value}
        size={size}
        mr="4px"
      >
        {label}
      </Radio>
      <Box as="span" mr={1}>
        {labelDescription}
      </Box>
      {badgeText && (
        <Badge size={badgeSize} variant={badgeVariant}>
          {badgeText}
        </Badge>
      )}
    </Box>
    <div>{children}</div>
  </StyledBox>
)

RadioBorderedBox.propTypes = {
  /**
   * See API of `Badge` component
   */
  badgeSize: PropTypes.oneOf<Sizes>(badgeSizes),

  /**
   * Add a badge next to the label
   */
  badgeText: PropTypes.string,
  /**
   * See API of `Badge` component
   */
  badgeVariant: PropTypes.oneOf<Variants>(badgeVariants),
  checked: PropTypes.bool,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  /**
   * Label next to the radio button, can be a string or a more complex child
   */
  label: PropTypes.node.isRequired,
  /**
   * Description next to the label
   */
  labelDescription: PropTypes.string,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  /**
   * Size of the radio button
   */
  size: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}

export default RadioBorderedBox
