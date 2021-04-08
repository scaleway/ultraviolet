import styled from '@emotion/styled'
import { transparentize } from 'polished'
import PropTypes from 'prop-types'
import React from 'react'
import Badge from '../Badge'
import BorderedBox from '../BorderedBox'
import Box from '../Box'
import Radio from '../Radio'

const StyledBorderedBox = styled(BorderedBox)`
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
  <StyledBorderedBox
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
    <Box>{children}</Box>
  </StyledBorderedBox>
)

RadioBorderedBox.propTypes = {
  label: PropTypes.string.isRequired,
  labelDescription: PropTypes.string,
  badgeText: PropTypes.string,
  badgeVariant: PropTypes.string,
  badgeSize: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  size: PropTypes.number,
}

RadioBorderedBox.defaultProps = {
  labelDescription: undefined,
  size: 24,
  disabled: false,
  checked: false,
  onFocus: null,
  onBlur: null,
  badgeText: undefined,
  badgeVariant: 'info',
  badgeSize: 'xsmall',
}

export default RadioBorderedBox
