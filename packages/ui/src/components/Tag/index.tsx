import styled from '@emotion/styled'
import type { MouseEventHandler, ReactNode } from 'react'
import useClipboard from 'react-use-clipboard'
import type { Color } from '../../theme'
import { Button } from '../Button'
import type { IconName } from '../Icon'
import { Icon } from '../Icon'
import { Loader } from '../Loader'
import { Tooltip } from '../Tooltip'

const COPY_DURATION = 2500

const StyledContainer = styled('span', {
  shouldForwardProp: prop => !['variant', 'copiable'].includes(prop),
})<{ variant: Color | 'disabled'; copiable?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  border-radius: ${({ theme }) => theme.radii.default};
  padding: 0 ${({ theme }) => theme.space['1']};
  gap: ${({ theme }) => theme.space['1']};
  width: fit-content;
  height: 24px;
  ${({ copiable, theme }) =>
    copiable &&
    `
    &:hover, &:active {
      cursor: pointer;
      background: ${theme.colors.neutral.backgroundWeakHover};
      border-color: ${theme.colors.neutral.borderStrongHover};
    }

    &:active {
      box-shadow: ${theme.shadows.focusNeutral};
    }
  `}

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
  copiable?: boolean
  copyText?: string
  copiedText?: string
  className?: string
  children: ReactNode
  'data-testid'?: string
}

type TagInnerProps = Pick<
  TagProps,
  'children' | 'isLoading' | 'onClose',
  'icon' | 'disabled'
>

const StyledCloseButton = styled(Button)`
  width: fit-content;
  height: fit-content;
  padding: 2px;
`

const TagInner = ({
  children,
  isLoading = false,
  onClose,
  icon,
  disabled = false,
}: TagInnerProps) => (
  <>
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
  </>
)

export const Tag = ({
  children,
  isLoading,
  onClose,
  icon,
  copiable = false,
  copyText = 'Copy',
  copiedText = 'Copied!',
  disabled,
  variant = 'neutral',
  className,
  'data-testid': dataTestId,
}: TagProps) => {
  const [isCopied, setCopied] = useClipboard(
    typeof children === 'string' ? children : '',
    {
      successDuration: COPY_DURATION,
    },
  )

  if (copiable && !disabled) {
    const Container = StyledContainer.withComponent('button')

    return (
      <Tooltip text={isCopied ? copiedText : copyText}>
        <Container
          variant={disabled ? 'disabled' : variant}
          copiable
          onClick={setCopied}
          className={className}
          data-testid={dataTestId}
        >
          <TagInner
            isLoading={isLoading}
            onClose={onClose}
            icon={icon}
            disabled={disabled}
          >
            {children}
          </TagInner>
        </Container>
      </Tooltip>
    )
  }

  return (
    <StyledContainer
      variant={disabled ? 'disabled' : variant}
      className={className}
      data-testid={dataTestId}
    >
      <TagInner
        isLoading={isLoading}
        onClose={onClose}
        icon={icon}
        disabled={disabled}
      >
        {children}
      </TagInner>
    </StyledContainer>
  )
}
