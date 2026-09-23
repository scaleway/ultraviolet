'use client'

import { CloseIcon } from '@ultraviolet/icons'
import { cn } from '@ultraviolet/utils'
import type { ComponentProps, ReactNode } from 'react'
import { CopyButton } from '../../Action/CopyButton'
import { Link } from '../../Action/Link'
import { Stack } from '../../Layout/Stack'
import { VisuallyHidden } from '../../Other/VisuallyHidden'
import { Text } from '../../Typography/Text'
import { Tag } from '../Tag'
import { tagStyle } from '../Tag/styles.css'
import { tagLinkStyle } from './styles.css'

type TagLinkProps = {
  link: string
  label: string
  icon?: ReactNode
  href: string
  sentiment?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'
  /** Set loading state with loading text to display next to the loader */
  loading?: string
} & Pick<
  ComponentProps<typeof Tag>,
  'className' | 'copiable' | 'data-testid' | 'onClose' | 'style' | 'variant' | 'isLoading'
> &
  Pick<ComponentProps<typeof CopyButton>, 'copiedText' | 'copyText' | 'onCopy'>

export const TagLink = ({
  link,
  label,
  icon,
  className,
  href,
  copiable = false,
  'data-testid': dataTestid,
  onClose,
  sentiment = 'primary',
  style,
  variant = 'default',
  copiedText,
  copyText,
  onCopy,
  loading,
}: TagLinkProps) =>
  loading ? (
    <Tag isLoading sentiment={sentiment}>
      {loading}
    </Tag>
  ) : (
    <Text
      as="span"
      className={cn(tagLinkStyle.tagLink, tagStyle.container({ sentiment }), className)}
      variant={variant === 'code' ? 'code' : 'caption'}
      oneLine
      sentiment={sentiment}
      data-testid={dataTestid}
      style={style}
    >
      <Stack
        direction="row"
        gap="0.5"
        alignItems="center"
        justifyContent="center"
        className={cn(tagLinkStyle.idStack[sentiment], tagLinkStyle.idStackBase)}
      >
        {icon}
        {label}
      </Stack>
      <Stack
        className={tagLinkStyle.linkStack({ copiable })}
        as="span"
        gap={0.5}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <Link href={href} size="xsmall" sentiment={sentiment} className={tagLinkStyle.link[variant]}>
          {link}
        </Link>
        {copiable ? (
          <CopyButton
            size="xsmall"
            sentiment={sentiment}
            value={link}
            copiedText={copiedText}
            copyText={copyText}
            onCopy={onCopy}
            className={tagLinkStyle.copyButton[sentiment]}
          />
        ) : null}
      </Stack>
      {onClose ? (
        <button
          data-testid="close-tag"
          onClick={onClose}
          type="button"
          className={tagStyle.container({ isButton: true, sentiment, tagLink: true })}
        >
          <VisuallyHidden>
            Remove tag {label}: {link}
          </VisuallyHidden>
          <CloseIcon size="small" />
        </button>
      ) : null}
    </Text>
  )

TagLink.displayName = 'Taglink'
