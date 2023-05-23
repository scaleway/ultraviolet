import styled from '@emotion/styled'
import type { MouseEventHandler, ReactNode } from 'react'
import type { Color } from '../../theme'
import { Button } from '../Button'
import type { IconName } from '../Icon'
import { Icon } from '../Icon'
import { Loader } from '../Loader'

const StyledContainer = styled('span', {
  shouldForwardProp: prop => !['variant'].includes(prop),
})<{ variant: Color | 'disabled' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  border-radius: ${({ theme }) => theme.radii.default};
  padding: 0 ${({ theme }) => theme.space['1']};
  gap: ${({ theme }) => theme.space['1']};
  width: fit-content;
  height: 24px;
  ${({ variant, theme }) => {
    if (variant === 'disabled') {
      return `
      color: ${theme.colors.neutral.textDisabled};
      background: ${theme.colors.neutral.backgroundDisabled};
      border: solid 1px ${theme.colors.neutral.borderDisabled};
      cursor: not-allowed

    `
    }
    if (variant === 'neutral') {
      return `
      color: ${theme.colors.neutral.text};
      background: ${theme.colors.neutral.background};
      border: solid 1px ${theme.colors.neutral.border};
    `
    }

    return `
      color: ${theme.colors[variant].text};
      background: ${theme.colors[variant].background};
      border: solid 1px ${theme.colors[variant].background};
    `
  }}
`

const StyledTag = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: inherit;
  max-width: 232px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

type TagProps = {
  isLoading?: boolean
  onClose?: MouseEventHandler<HTMLButtonElement>
  variant?: Color
  disabled?: boolean
  /**
   * Defines icon to display on left side of badge. **Only available on medium and large sizes**.
   */
  icon?: IconName
  className?: string
  children: ReactNode
  'data-testid'?: string
}

const StyledCloseButton = styled(Button)`
  width: fit-content;
  height: fit-content;
  padding: 2px;
`

export const Tag = ({
  children,
  isLoading = false,
  onClose,
  icon,
  disabled = false,
  variant = 'neutral',
  className,
  'data-testid': dataTestId,
}: TagProps) => (
  <StyledContainer
    variant={disabled ? 'disabled' : variant}
    className={className}
    data-testid={dataTestId}
  >
    {icon ? <Icon name={icon} size={16} /> : null}
    <StyledTag aria-disabled={disabled}>{children}</StyledTag>

    {/* @check: Size issue here, Clickable icon ? */}
    {onClose && !isLoading ? (
      <StyledCloseButton
        onClick={onClose}
        disabled={disabled}
        aria-label="Close tag"
        data-testid="close-tag"
        variant="ghost"
        sentiment="neutral"
        icon="close"
        size="small"
      />
    ) : null}
    {isLoading ? <Loader active size={16} /> : null}
  </StyledContainer>
)
