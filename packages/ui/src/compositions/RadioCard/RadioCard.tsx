import type { ComponentProps, ReactNode } from 'react'
import { Badge, Expandable, SelectableCard, Stack, Text } from '../../components'
import type { Radio } from '../../components/Radio'

type RadioProps = Pick<
  ComponentProps<typeof Radio>,
  'name' | 'checked' | 'onChange' | 'onFocus' | 'onBlur' | 'disabled' | 'value' | 'error' | 'data-testid'
>

type RadioCardProps = RadioProps & {
  badgeSize?: ComponentProps<typeof Badge>['size']
  badgeText?: string
  badgeProminence?: ComponentProps<typeof Badge>['prominence']
  badgeVariant?: ComponentProps<typeof Badge>['sentiment']
  children?: ReactNode
  label: string
  labelDescription?: ReactNode
  name: string
  sideText?: string
  value: string | number
}

export const RadioCard = ({
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
  'data-testid': dataTestId,
}: RadioCardProps) => (
  <Stack data-testid={dataTestId} flex={1} gap={1} width="100%">
    <SelectableCard
      checked={checked}
      disabled={disabled}
      isError={!!error}
      label={
        <Stack as="span" justifyContent="space-between">
          <Stack as="span" gap={1} alignItems="center">
            {label}
            {labelDescription && typeof labelDescription === 'function' ? labelDescription : null}
            {labelDescription && typeof labelDescription !== 'function' ? (
              <Text as="span" disabled={disabled} variant="body">
                {labelDescription}
              </Text>
            ) : null}
            {badgeText ? (
              <Badge disabled={disabled} prominence={badgeProminence} sentiment={badgeVariant} size={badgeSize}>
                {badgeText}
              </Badge>
            ) : null}
          </Stack>
          {sideText ? (
            <Text as="span" disabled={disabled} sentiment="primary" variant="bodySmallStronger">
              {sideText}
            </Text>
          ) : null}
        </Stack>
      }
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
      showTick
      type="radio"
      value={value}
    >
      <Stack flex={1} gap={1} width="100%">
        {children ? (
          <Text as="p" disabled={disabled} variant="body">
            {children}
          </Text>
        ) : null}
      </Stack>
    </SelectableCard>
    {error ? (
      <Expandable opened={!!error}>
        <Text as="p" sentiment="danger" variant="caption">
          {error}
        </Text>
      </Expandable>
    ) : null}
  </Stack>
)
