'use client'

import type { XOR } from '@scaleway/types'
import { CloseIcon } from '@ultraviolet/icons'
import { cn } from '@ultraviolet/utils'
import type { RenderProp } from '@ultraviolet/utils'
import type { ComponentProps, ReactNode } from 'react'
import { Button } from '../../Action/Button'
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
  prefixText: string
  prefixIcon?: ReactNode
  sentiment?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'
  /** Set loading state with loading text to display next to the loader */
  loading?: string
} & Pick<
  ComponentProps<typeof Tag>,
  'className' | 'copiable' | 'data-testid' | 'onClose' | 'style' | 'variant' | 'isLoading'
> &
  Pick<ComponentProps<typeof CopyButton>, 'copiedText' | 'copyText' | 'onCopy'> &
  XOR<
    [
      {
        href: string
      },
      {
        /**
         * Custom element or render function to use instead of the default anchor, e.g. to enable client-side
         * navigation with a routing component. The element carries its own `href`.
         *
         * Element form (props auto-merged):
         * ```tsx
         * <TagLink renderLink={<NextLink href="/id" />}>id</TagLink>
         * ```
         *
         * Function form (you control prop merging):
         * ```tsx
         * <TagLink renderLink={(props) => <NextLink {...props} href="/id" />}>id</TagLink>
         * ```
         */
        renderLink: RenderProp
      },
    ]
  >

export const TagLink = ({
  link,
  prefixText,
  prefixIcon,
  className,
  href,
  renderLink,
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
      sentiment={sentiment}
      data-testid={dataTestid}
      style={style}
    >
      <Stack
        direction="row"
        gap="0.5"
        alignItems="center"
        justifyContent="center"
        className={cn(tagLinkStyle.prefixStack[sentiment], tagLinkStyle.prefixStackBase)}
      >
        {prefixIcon}
        {prefixText}
      </Stack>
      <Stack
        className={tagLinkStyle.linkStack({ copiable, closable: Boolean(onClose) })}
        as="span"
        gap={0.5}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <Link
          {...(renderLink ? { render: renderLink } : { href })}
          size="xsmall"
          sentiment={sentiment}
          className={tagLinkStyle.link[variant]}
        >
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
            className={tagLinkStyle.copyButton({ sentiment, closable: Boolean(onClose) })}
          />
        ) : null}
      </Stack>
      {onClose ? (
        <Button
          variant="ghost"
          size="xsmall"
          sentiment={sentiment}
          data-testid="close-tag"
          onClick={onClose}
          type="button"
          className={tagLinkStyle.closeButton}
        >
          <VisuallyHidden>
            Remove tag {prefixText}: {link}
          </VisuallyHidden>
          <CloseIcon size="small" />
        </Button>
      ) : null}
    </Text>
  )

TagLink.displayName = 'Taglink'
