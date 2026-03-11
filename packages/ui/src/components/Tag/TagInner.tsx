'use client'

import { CloseIcon } from '@ultraviolet/icons/CloseIcon'
import { CopyContentIcon } from '@ultraviolet/icons/CopyContentIcon'
import { Button } from '../Button'
import { Loader } from '../Loader'
import { Text } from '../Text'
import { tagStyle } from './styles.css'
import type { TagProps } from './type'

type TagInnerProps = Omit<
  TagProps,
  'copyText' | 'copiedText' | 'className' | 'data-testid'
>

export const TagInner = ({
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
