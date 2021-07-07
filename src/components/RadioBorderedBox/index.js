import styled from '@emotion/styled'
import { transparentize } from 'polished'
import PropTypes from 'prop-types'
import React from 'react'
import Badge from '../Badge'
import Box from '../Box'
import Radio from '../Radio'

const StyledBox = styled(Box)`
  &:hover {
    cursor: pointer;
  }

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

const RadioBorderedBox = ({
  label,
  labelDescription,
  badgeText,
  badgeSize,
  badgeVariant,
  checked,
  onChange,
  onFocus,
  onBlur,
  disabled,
  name,
  value,
  size,
  children,
  ...props
}) => (
  <StyledBox
    bordered
    as="label"
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
  badgeSize: PropTypes.string,
  /**
   * Add a badge next to the label
   */
  badgeText: PropTypes.string,
  /**
   * See API of `Badge` component
   */
  badgeVariant: PropTypes.string,
  checked: PropTypes.bool,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  /**
   * Label next to the radio button
   */
  label: PropTypes.string.isRequired,
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

RadioBorderedBox.defaultProps = {
  badgeSize: 'xsmall',
  badgeText: undefined,
  badgeVariant: 'info',
  checked: false,
  disabled: false,
  labelDescription: undefined,
  onBlur: null,
  onChange: undefined,
  onFocus: null,
  size: 24,
}

export default RadioBorderedBox
