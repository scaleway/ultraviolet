import type { DistributiveOmit } from '@scaleway/types'
import { Link as UVLink } from '@ultraviolet/ui'
import NextLink from 'next/link'
import type { LinkProps } from 'next/link'
import { forwardRef } from 'react'
import type { ComponentProps } from 'react'

type LinkPropsType = DistributiveOmit<LinkProps, ''> & DistributiveOmit<ComponentProps<typeof UVLink>, ''>

export const Link = forwardRef<HTMLAnchorElement, LinkPropsType>(
  ({ prefetch, replace, scroll, shallow, locale, href, iconPosition = 'right', ...uvprops }, ref) => (
    <NextLink
      passHref
      legacyBehavior
      href={href}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      locale={locale}
      prefetch={prefetch}
    >
      <UVLink href={href} iconPosition={iconPosition} ref={ref} {...uvprops} />
    </NextLink>
  ),
)
