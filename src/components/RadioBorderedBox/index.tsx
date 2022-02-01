import styled from '@emotion/styled'
import { transparentize } from 'polished'
import PropTypes from 'prop-types'
import React, { ComponentProps, FunctionComponent, ReactNode } from 'react'
import Badge, { badgeSizes, badgeVariants } from '../Badge'
import BorderedBox from '../BorderedBox'
import Radio from '../Radio'

type RadioProps = Pick<
  ComponentProps<typeof Radio>,
  | 'name'
  | 'checked'
  | 'onChange'
  | 'onFocus'
  | 'onBlur'
  | 'disabled'
  | 'value'
  | 'size'
  | 'error'
  | 'valid'
>

const StyledBox = styled(BorderedBox)<{ disabled: boolean; checked: boolean }>`
  display: block;

  ${({ disabled, checked, theme: { colors } }) => {
    if (disabled)
      return `
        cursor: not-allowed !important;
        color: ${colors.neutral.textDisabled};
      `
    if (checked)
      return `
        border: 1px solid ${colors.primary.borderWeak} !important;
        box-shadow: 0 0 0 2px ${transparentize(
          0.75,
          colors.primary.borderWeak,
        )};
      `

    return null
  }}
`

const StyledRadioContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.space['1']};
`

type RadioBorderedBoxProps = RadioProps & {
  badgeSize?: ComponentProps<typeof Badge>['size']
  badgeText?: string
  badgeVariant?: ComponentProps<typeof Badge>['variant']
  children: ReactNode
  label: ReactNode
  labelDescription?: string
  name: string
  size?: number
  value: string | number
}

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
  error,
  valid,
}) => (
  <StyledBox disabled={disabled} checked={checked}>
    <StyledRadioContainer>
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
        error={error}
        valid={valid}
      >
        {label}
      </Radio>
      <span>{labelDescription}</span>
      {badgeText && (
        <>
          &nbsp;
          <Badge size={badgeSize} variant={badgeVariant}>
            {badgeText}
          </Badge>
        </>
      )}
    </StyledRadioContainer>
    <div>{children}</div>
  </StyledBox>
)

RadioBorderedBox.propTypes = {
  /**
   * See API of `Badge` component
   */
  badgeSize: PropTypes.oneOf<ComponentProps<typeof Badge>['size']>(badgeSizes),

  /**
   * Add a badge next to the label
   */
  badgeText: PropTypes.string,
  /**
   * See API of `Badge` component
   */
  badgeVariant:
    PropTypes.oneOf<ComponentProps<typeof Badge>['variant']>(badgeVariants),
  checked: PropTypes.bool,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.string,
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
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  /**
   * Size of the radio button
   */
  size: PropTypes.number,
  valid: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}

export default RadioBorderedBox
