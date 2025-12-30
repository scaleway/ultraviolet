'use client'

import { CloseIcon } from '@ultraviolet/icons'
import { cn } from '@ultraviolet/utils'
import type { CSSProperties, MouseEventHandler, ReactNode } from 'react'
import { useMemo } from 'react'
import useClipboard from 'react-use-clipboard'
import { Button } from '../Button'
import { Loader } from '../Loader'
import { Text } from '../Text'
import { Tooltip } from '../Tooltip'
import type { SENTIMENTS } from './styles.css'
import { closeButtonTag, containerTag, textTag } from './styles.css'

const COPY_DURATION = 2500

type TagProps = {
  isLoading?: boolean
  onClose?: MouseEventHandler<HTMLButtonElement>
  sentiment?: (typeof SENTIMENTS)[number]
  disabled?: boolean
  copiable?: boolean
  copyText?: string
  copiedText?: string
  className?: string
  children: ReactNode
  'data-testid'?: string
  style?: CSSProperties
}

type TagInnerProps = Omit<
  TagProps,
  'copiable' | 'copyText' | 'copiedText' | 'className' | 'data-testid'
>

const TagInner = ({
  children,
  isLoading = false,
  onClose,
  disabled = false,
}: TagInnerProps) => (
  <>
    <Text
      aria-disabled={disabled}
      as="span"
      className={textTag}
      oneLine
      variant="caption"
    >
      {children}
    </Text>

    {onClose && !isLoading ? (
      <Button
        aria-label="Close tag"
        className={closeButtonTag}
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
  copyText = 'Copy',
  copiedText = 'Copied!',
  disabled,
  sentiment = 'neutral',
  className,
  style,
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
    return (
      <Tooltip text={isCopied ? copiedText : copyText}>
        <button
          className={cn(
            className,
            containerTag({ copiable, disabled, sentiment }),
          )}
          data-testid={dataTestId}
          disabled={disabled}
          onClick={setCopied}
          type="button"
        >
          <TagInner disabled={disabled} isLoading={isLoading} onClose={onClose}>
            {children}
          </TagInner>
        </button>
      </Tooltip>
    )
  }

  return (
    <span
      className={cn(className, containerTag({ disabled, sentiment }))}
      data-testid={dataTestId}
      style={style}
    >
      <TagInner disabled={disabled} isLoading={isLoading} onClose={onClose}>
        {children}
      </TagInner>
    </span>
  )
}
