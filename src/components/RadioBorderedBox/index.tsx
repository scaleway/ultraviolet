import styled from '@emotion/styled'
import { ComponentProps, ReactNode } from 'react'
import Badge from '../Badge'
import Expandable from '../Expandable'
import Radio from '../Radio'
import SelectableCard from '../SelectableCard'
import Text from '../Text'

type RadioProps = Pick<
  ComponentProps<typeof Radio>,
  | 'name'
  | 'checked'
  | 'onChange'
  | 'onFocus'
  | 'onBlur'
  | 'disabled'
  | 'value'
  | 'error'
>

const StyledRadioContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0 ${({ theme }) => theme.space['1']};
`

const StyledSpaceContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const StyledError = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.danger.text};
`

const StyledMainContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space['1']};
`

type RadioBorderedBoxProps = RadioProps & {
  badgeSize?: ComponentProps<typeof Badge>['size']
  badgeText?: string
  badgeProminence?: ComponentProps<typeof Badge>['prominence']
  badgeVariant?: ComponentProps<typeof Badge>['variant']
  children?: ReactNode
  label: string
  labelDescription?: ReactNode
  name: string
  sideText?: string
  value: string | number
}

const RadioBorderedBox = ({
  label,
  labelDescription,
  sideText,
  badgeText,
  badgeSize = 'small',
  badgeVariant = 'info',
  badgeProminence,
  checked = false,
  onChange,
  onFocus,
  onBlur,
  disabled = false,
  name,
  value,
  children,
  error,
}: RadioBorderedBoxProps) => (
  <StyledMainContainer>
    <SelectableCard
      value={value}
      onChange={onChange}
      disabled={disabled}
      name={name}
      checked={checked}
      isError={!!error}
      onFocus={onFocus}
      onBlur={onBlur}
      type="radio"
      showTick
    >
      <StyledMainContainer>
        <StyledSpaceContainer>
          <StyledRadioContainer>
            {label}
            {labelDescription && typeof labelDescription === 'function'
            ? labelDescription
            : null}
          {labelDescription && typeof labelDescription !== 'function' ? (
              <Text as="span" variant="body" disabled={disabled}>
                {labelDescription}
              </Text>
            ) : null}
            {badgeText ? (
              <Badge
                size={badgeSize}
                variant={badgeVariant}
                prominence={badgeProminence}
                disabled={disabled}
              >
                {badgeText}
              </Badge>
            ) : null}
          </StyledRadioContainer>
          {sideText ? (
            <Text
              as="span"
              variant="bodySmallStronger"
              color="primary"
              disabled={disabled}
            >
              {sideText}
            </Text>
          ) : null}
        </StyledSpaceContainer>
        {children ? (
          <Text as="p" variant="body" disabled={disabled}>
            {children}
          </Text>
        ) : null}
      </StyledMainContainer>
    </SelectableCard>
    {error ? (
      <Expandable opened={!!error}>
        <StyledError>{error}</StyledError>
      </Expandable>
    ) : null}
  </StyledMainContainer>
)

export default RadioBorderedBox
