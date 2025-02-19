import styled from '@emotion/styled'
import { Icon } from '@ultraviolet/icons/legacy'
import type { ComponentProps, MouseEventHandler, ReactNode } from 'react'
import useClipboard from 'react-use-clipboard'
import type { Color } from '../../theme'
import { Button } from '../Button'
import { Loader } from '../Loader'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { Tooltip } from '../Tooltip'

type IconName = ComponentProps<typeof Icon>['name']

const COPY_DURATION = 2500

const StyledContainer = styled('span', {
  shouldForwardProp: prop => !['sentiment', 'copiable'].includes(prop),
})<{ sentiment: Color | 'disabled'; copiable?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  border-radius: ${({ theme }) => theme.radii.default};
  padding: 0 ${({ theme }) => theme.space['1']};
  gap: ${({ theme }) => theme.space['1']};
  width: fit-content;
  height: ${({ theme }) => theme.sizing['300']};
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

  ${({ sentiment, theme }) => {
    if (sentiment === 'disabled') {
      return `
      color: ${theme.colors.neutral.textDisabled};
      background: ${theme.colors.neutral.backgroundDisabled};
      border: solid 1px ${theme.colors.neutral.borderDisabled};
      cursor: not-allowed

    `
    }
    if (sentiment === 'neutral') {
      return `
      color: ${theme.colors.neutral.text};
      background: ${theme.colors.neutral.background};
      border: solid 1px ${theme.colors.neutral.border};
    `
    }

    return `
      color: ${theme.colors[sentiment].text};
      background: ${theme.colors[sentiment].background};
      border: solid 1px ${theme.colors[sentiment].background};
    `
  }}
`

const StyledText = styled(Text)`
  max-width: 14.5rem;
`

type TagProps = {
  isLoading?: boolean
  onClose?: MouseEventHandler<HTMLButtonElement>
  sentiment?: Color
  disabled?: boolean
  /**
   * @deprecated Add the icon directly into the children
   */
  icon?: IconName
  copiable?: boolean
  copyText?: string
  copiedText?: string
  className?: string
  children: ReactNode
  'data-testid'?: string
}

type TagInnerProps = Omit<
  TagProps,
  'copiable' | 'copyText' | 'copiedText' | 'className' | 'data-testid'
>

const StyledCloseButton = styled(Button)`
  width: fit-content;
  height: fit-content;
  padding: ${({ theme }) => theme.space['0.25']};
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
    <StyledText as="div" variant="caption" oneLine aria-disabled={disabled}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        gap={0.5}
      >
        {children}
      </Stack>
    </StyledText>

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

/**
 * Tag component is used to display a short text description of an item. It can be used to display a category
 * or any other metadata.
 */
export const Tag = ({
  children,
  isLoading,
  onClose,
  icon,
  copiable = false,
  copyText = 'Copy',
  copiedText = 'Copied!',
  disabled,
  sentiment = 'neutral',
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
          // @note: sending disabled as a special sentiment is a bit weird
          sentiment={disabled ? 'disabled' : sentiment}
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
      sentiment={disabled ? 'disabled' : sentiment}
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
