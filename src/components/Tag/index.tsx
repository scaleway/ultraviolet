import styled from '@emotion/styled'
import { MouseEventHandler, ReactNode } from 'react'
import { Color } from '../../theme'
import Icon, { IconName } from '../Icon'
import Loader from '../Loader'
import Touchable from '../Touchable'

const StyledContainer = styled('span', {
  shouldForwardProp: prop => !['variant'].includes(prop),
})<{ variant: Color | 'disabled' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  border-radius: ${({ theme }) => theme.space['0.5']};
  padding: 0 ${({ theme }) => theme.space['1']};
  gap: ${({ theme }) => theme.space['1']};
  width: fit-content;
  height: ${({ theme }) => theme.space['3']};
  ${({ variant, theme }) => {
    if (variant === 'disabled')
      return `
      color: ${theme.colors.neutral.textDisabled};
      background: ${theme.colors.neutral.backgroundDisabled};
      border: solid 1px ${theme.colors.neutral.borderDisabled};
      cursor: not-allowed

    `
    if (variant === 'neutral')
      return `
      color: ${theme.colors.neutral.text};
      background: ${theme.colors.neutral.background};
      border: solid 1px ${theme.colors.neutral.border};
    `

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

const StyledTouchable = styled(Touchable, {
  shouldForwardProp: prop => !['variant'].includes(prop),
})<{ variant: Color }>`
  display: flex;
  align-items: center;
  svg {
    fill: ${({ theme }) => theme.colors.neutral.textWeak};
  }
  &:hover:enabled,
  &:focus:enabled {
    svg {
      fill: ${({ theme }) => theme.colors.neutral.textHover};
    }
  }
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
}

const Tag = ({
  children,
  isLoading = false,
  onClose,
  icon,
  disabled = false,
  variant = 'neutral',
  className,
}: TagProps) => (
  <StyledContainer
    variant={disabled ? 'disabled' : variant}
    className={className}
  >
    {icon ? <Icon name={icon} size={16} /> : null}
    <StyledTag aria-disabled={disabled}>{children}</StyledTag>

    {onClose && !isLoading ? (
      <StyledTouchable
        onClick={!isLoading ? onClose : undefined}
        variant={variant}
        disabled={disabled}
        aria-label="Close tag"
      >
        <Icon name="close" size={16} />
      </StyledTouchable>
    ) : null}
    {isLoading ? <Loader active size={16} /> : null}
  </StyledContainer>
)

export default Tag
