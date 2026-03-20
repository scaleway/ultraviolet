'use client'

import { cn } from '@ultraviolet/utils'
import { useMemo } from 'react'
import useClipboard from 'react-use-clipboard'
import { Tooltip } from '../Tooltip'
import { tagStyle } from './styles.css'
import { TagInner } from './TagInner'
import type { TagProps } from './type'

const COPY_DURATION = 2500

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
          onClick={setCopied}
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
