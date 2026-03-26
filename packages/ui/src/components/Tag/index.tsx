'use client'

import { CloseIcon } from '@ultraviolet/icons/CloseIcon'
import { CopyContentIcon } from '@ultraviolet/icons/CopyContentIcon'
import { cn, useClipboard } from '@ultraviolet/utils'
import { useMemo } from 'react'

import { Button } from '../Button'
import { Loader } from '../Loader'
import { Text } from '../Text'
import { Tooltip } from '../Tooltip'

import { tagStyle } from './styles.css'

import type { SENTIMENTS } from './styles.css'
import type { CSSProperties, MouseEventHandler, ReactNode } from 'react'

const COPY_DURATION = 2500

type TagProps = {
  isLoading?: boolean
  sentiment?: (typeof SENTIMENTS)[number]
  disabled?: boolean

  className?: string
  variant?: 'default' | 'code'
  'data-testid'?: string
  style?: CSSProperties
} & (
  | {
      keyValue: { key: string; value: string }
      children?: never
      copiable?: never
      copyButton?: never
      copyText?: never
      copiedText?: never
      onClose?: never
    }
  | {
      keyValue?: never
      children: ReactNode
      copiable?: boolean
      copyButton?: boolean
      copyText?: string

      copiedText?: string
      onClose?: MouseEventHandler<HTMLButtonElement>
    }
)

type TagInnerProps = Omit<
  TagProps,
  'copyText' | 'copiedText' | 'className' | 'data-testid'
>

const TagInner = ({
  children,
  isLoading = false,
  onClose,
  disabled = false,
  copiable,
  variant,
  copyButton,
}: TagInnerProps) => (
  <>
    <Text
      aria-disabled={disabled}
      as="span"
      className={tagStyle.text}
      oneLine
      variant={variant === 'code' ? 'code' : 'caption'}
    >
      {children}
    </Text>
    {copiable && copyButton && !isLoading ? (
      <CopyContentIcon size="xsmall" />
    ) : null}
    {onClose && !isLoading ? (
      <Button
        aria-label="Close tag"
        className={tagStyle.closeButton}
        data-testid="close-tag"
        disabled={disabled}
        onClick={onClose}
        sentiment="neutral"
        size="small"
        variant="ghost"
      >
        <CloseIcon size="small" />
      </Button>
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
  copyButton,
  copyText = 'Copy',
  copiedText = 'Copied!',
  disabled,
  sentiment = 'neutral',
  variant = 'default',
  className,
  style,
  keyValue,
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

  if (keyValue) {
    return (
      <>
        <span
          className={cn(
            className,
            tagStyle.container({
              disabled,
              sentiment,
              isKey: true,
              isKeyValue: true,
            }),
          )}
          data-testid={dataTestId}
          style={style}
        >
          <TagInner
            copiable
            copyButton={copyButton}
            disabled={disabled}
            isLoading={isLoading}
            onClose={onClose}
            variant={variant}
          >
            {keyValue.key}
          </TagInner>
        </span>
        <span
          className={cn(
            className,
            tagStyle.container({
              disabled,
              sentiment,
              isValue: true,
              isKeyValue: true,
            }),
          )}
          data-testid={dataTestId}
          style={style}
        >
          <TagInner
            copiable
            copyButton={copyButton}
            disabled={disabled}
            isLoading={isLoading}
            onClose={onClose}
            variant={variant}
          >
            {keyValue.value}
          </TagInner>
        </span>
      </>
    )
  }

  if (copiable && !disabled) {
    return (
      <Tooltip text={isCopied ? copiedText : copyText}>
        <button
          className={cn(
            className,
            tagStyle.container({ copiable, disabled, sentiment }),
          )}
          data-testid={dataTestId}
          disabled={disabled}
          onClick={() => {
            setCopied().catch(() => null)
          }}
          type="button"
        >
          <TagInner
            copiable
            copyButton={copyButton}
            disabled={disabled}
            isLoading={isLoading}
            onClose={onClose}
            variant={variant}
          >
            {children}
          </TagInner>
        </button>
      </Tooltip>
    )
  }

  return (
    <span
      className={cn(className, tagStyle.container({ disabled, sentiment }))}
      data-testid={dataTestId}
      style={style}
    >
      <TagInner
        disabled={disabled}
        isLoading={isLoading}
        onClose={onClose}
        variant={variant}
      >
        {children}
      </TagInner>
    </span>
  )
}
