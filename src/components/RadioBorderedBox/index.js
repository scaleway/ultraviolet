import styled from '@emotion/styled'
import { transparentize } from 'polished'
import PropTypes from 'prop-types'
import React from 'react'
import Badge from '../Badge'
import BorderedBox from '../BorderedBox'
import Box from '../Box'
import Radio from '../Radio'
import Typography from '../Typography'

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
        <Typography color="gray950">{label}</Typography>
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
  badgeSize: PropTypes.string,
  badgeText: PropTypes.string,
  badgeVariant: PropTypes.string,
  checked: PropTypes.bool,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  labelDescription: PropTypes.string,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
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
  onFocus: null,
  size: 24,
}

export default RadioBorderedBox
