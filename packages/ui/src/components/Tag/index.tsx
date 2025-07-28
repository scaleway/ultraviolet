'use client'

import styled from '@emotion/styled'
import { CloseIcon } from '@ultraviolet/icons'
import type { MouseEventHandler, ReactNode } from 'react'
import { useMemo } from 'react'
import useClipboard from 'react-use-clipboard'
import type { Color } from '../../theme'
import { Button } from '../Button'
import { Loader } from '../Loader'
import { Text } from '../Text'
import { Tooltip } from '../Tooltip'

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
  disabled = false,
}: TagInnerProps) => (
  <>
    <StyledText aria-disabled={disabled} as="div" oneLine variant="caption">
      {children}
    </StyledText>

    {onClose && !isLoading ? (
      <StyledCloseButton
        aria-label="Close tag"
        data-testid="close-tag"
        disabled={disabled}
        onClick={onClose}
        sentiment="neutral"
        size="small"
        variant="ghost"
      >
        <CloseIcon size="small" />
      </StyledCloseButton>
    ) : null}
    {isLoading ? <Loader active size="small" /> : null}
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
  copiable = false,
  copyText = 'Copy',
  copiedText = 'Copied!',
  disabled,
  sentiment = 'neutral',
  className,
  'data-testid': dataTestId,
}: TagProps) => {
  const stringChildren = useMemo(() => {
    if (typeof children === 'string') {
      return children
    }

    if (Array.isArray(children)) {
      return children.filter(child => typeof child === 'string').join('')
    }

    return ''
  }, [children])

  const [isCopied, setCopied] = useClipboard(stringChildren, {
    successDuration: COPY_DURATION,
  })

  if (copiable && !disabled) {
    const Container = StyledContainer.withComponent('button')

    return (
      <Tooltip text={isCopied ? copiedText : copyText}>
        <Container
          // @note: sending disabled as a special sentiment is a bit weird
          className={className}
          copiable
          data-testid={dataTestId}
          onClick={setCopied}
          sentiment={disabled ? 'disabled' : sentiment}
        >
          <TagInner disabled={disabled} isLoading={isLoading} onClose={onClose}>
            {children}
          </TagInner>
        </Container>
      </Tooltip>
    )
  }

  return (
    <StyledContainer
      className={className}
      data-testid={dataTestId}
      sentiment={disabled ? 'disabled' : sentiment}
    >
      <TagInner disabled={disabled} isLoading={isLoading} onClose={onClose}>
        {children}
      </TagInner>
    </StyledContainer>
  )
}
