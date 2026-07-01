'use client'

import { useClipboard } from '@scaleway/use-clipboard'
import { CloseIcon } from '@ultraviolet/icons/CloseIcon'
import { CopyContentIcon } from '@ultraviolet/icons/CopyContentIcon'
import { cn } from '@ultraviolet/utils'
import { useMemo } from 'react'
import { Loader } from '../Loader'
import { Separator } from '../Separator'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { Tooltip } from '../Tooltip'
import type { TagProps } from './type'
import { tagStyle } from './styles.css'

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

    if (typeof children === 'number') {
      return children.toString()
    }

    if (keyValue) {
      return `${keyValue.key}:${keyValue.value}`
    }

    return ''
  }, [children, keyValue])

  const [isCopied, setCopied] = useClipboard(stringChildren, {
    successDuration: COPY_DURATION,
  })

  const isCopiable = copiable && !disabled
  const TagInner = copiable ? 'button' : 'span'
  const copyTextTooltip = isCopied ? copiedText : copyText

  return (
    <Tooltip text={isCopiable ? copyTextTooltip : null}>
      <Stack direction="row" className={tagStyle.wrapper[copiable ? 'copiable' : 'notCopiable']} width="fit-content">
        <TagInner
          className={cn(
            className,
            tagStyle.content[copiable ? 'copiable' : 'notCopiable'],
            tagStyle.container({
              disabled,
              sentiment,
              closable: !!onClose,
              copiable: copiable && !disabled,
              isButton: false,
            }),
          )}
          data-testid={dataTestId}
          style={style}
          onClick={() => {
            if (isCopiable) {
              setCopied().catch(() => null)
            }
          }}
        >
          <Text
            aria-disabled={disabled}
            as="span"
            className={tagStyle.text}
            oneLine
            variant={variant === 'code' ? 'code' : 'caption'}
            sentiment={disabled ? 'neutral' : sentiment}
            disabled={disabled}
          >
            {keyValue ? (
              <Stack direction="row" gap={1}>
                {keyValue.key}
                <Separator
                  sentiment={disabled ? 'neutral' : sentiment}
                  direction="vertical"
                  thickness={1}
                  className={tagStyle.separator}
                />
                {keyValue.value}
              </Stack>
            ) : (
              children
            )}
          </Text>
          {copiable && copyButton && !isLoading ? <CopyContentIcon size="xsmall" /> : null}
          {isLoading ? <Loader active size="small" /> : null}
        </TagInner>
        {onClose ? (
          <button
            aria-label="Close tag"
            data-testid="close-tag"
            disabled={disabled}
            onClick={onClose}
            type="button"
            className={tagStyle.container({ disabled, isButton: true, sentiment })}
          >
            <CloseIcon size="small" />
          </button>
        ) : null}
      </Stack>
    </Tooltip>
  )
}

Tag.displayName = 'Tag'
