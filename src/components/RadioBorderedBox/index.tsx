import styled from '@emotion/styled'
import { ComponentProps, ReactNode } from 'react'
import Badge from '../Badge'
import BorderedBox from '../BorderedBox'
import Expandable from '../Expandable'
import Radio from '../Radio'
import Typography from '../Typography'

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
>

type BorderedBoxTypes = {
  disabled: boolean
  checked: boolean
  error: string | ReactNode
}

const StyledRadio = styled(Radio)`
  margin-right: ${({ theme }) => theme.space['1']};
`

const StyledBorderedBox = styled(BorderedBox)<BorderedBoxTypes>`
  display: block;

  ${({ disabled, checked, error, theme: { colors, shadows } }) => {
    if (disabled)
      return `
        cursor: not-allowed !important;
        color: ${colors.neutral.textDisabled};
      `
    if (error)
      return `
        border: 1px solid ${colors.danger.borderWeak} !important;
        box-shadow: ${shadows.focusDanger};
      `

    if (checked)
      return `
        border: 1px solid ${colors.primary.borderWeak} !important;
        box-shadow: ${shadows.focusPrimary};
      `

    return null
  }}
`

const StyledRadioContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.space['1']};
`

const StyledError = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.danger.text};
  padding: ${({ theme }) => `0 ${theme.space['0.5']}`};
`

const StyledExpandable = styled(Expandable)`
  margin-top: ${({ theme }) => theme.space['1']};
  margin-bottom: ${({ theme }) => theme.space['1']};
`

type RadioBorderedBoxProps = RadioProps & {
  badgeSize?: ComponentProps<typeof Badge>['size']
  badgeText?: string
  badgeVariant?: ComponentProps<typeof Badge>['variant']
  children: ReactNode
  label: string
  labelDescription?: ReactNode
  name: string
  size?: number
  value: string | number
}

const RadioBorderedBox = ({
  label,
  labelDescription,
  badgeText,
  badgeSize = 'small',
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
}: RadioBorderedBoxProps) => (
  <>
    <StyledBorderedBox disabled={disabled} checked={checked} error={error}>
      <StyledRadioContainer>
        <StyledRadio
          name={name}
          checked={checked}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={disabled}
          value={value}
          size={size}
          error={error}
        >
          {label}
        </StyledRadio>
        {labelDescription ? (
          <Typography as="span">{labelDescription}</Typography>
        ) : null}
        {badgeText && (
          <>
            &nbsp;
            <Badge size={badgeSize} variant={badgeVariant} prominence="strong">
              {badgeText}
            </Badge>
          </>
        )}
      </StyledRadioContainer>
      <Typography>{children}</Typography>
    </StyledBorderedBox>
    <StyledExpandable opened={!!error}>
      <StyledError>{error}</StyledError>
    </StyledExpandable>
  </>
)

export default RadioBorderedBox
