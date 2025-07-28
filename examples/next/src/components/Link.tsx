import { Link as UVLink } from '@ultraviolet/ui'
import type { LinkProps } from 'next/link'
import NextLink from 'next/link'
import type { ComponentProps } from 'react'
import { forwardRef } from 'react'

type LinkPropsType = Omit<LinkProps, ''> &
  Omit<ComponentProps<typeof UVLink>, ''>

export const Link = forwardRef<HTMLAnchorElement, LinkPropsType>(
  (
    {
      prefetch,
      replace,
      scroll,
      shallow,
      locale,
      href,
      iconPosition = 'right',
      ...uvprops
    },
    ref,
  ) => {
    return (
      <NextLink
        href={href}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
        locale={locale}
        passHref
        legacyBehavior
      >
        <UVLink
          ref={ref}
          href={href}
          iconPosition={iconPosition}
          {...uvprops}
        />
      </NextLink>
    )
  },
)

export default Link
