import { useTheme } from '@emotion/react'
import PropTypes from 'prop-types'
import React, { ComponentProps, ElementType, ReactNode, Ref } from 'react'
import Box, { XStyledProps } from '../Box'

const ABSOLUTE_LINK_REGEXP = /^https?:\/\//
const TEL_LINK_REGEXP = /^tel:/
const MAILTO_LINK_REGEXP = /^mailto:/

const needNativeLink = (url?: string) => {
  if (!url) return false
  const isAbsolute = ABSOLUTE_LINK_REGEXP.test(url)
  const isTelLink = TEL_LINK_REGEXP.test(url)
  const isMailToLink = MAILTO_LINK_REGEXP.test(url)
  const isAnchor = url[0] === '#'

  return isAbsolute || isTelLink || isMailToLink || isAnchor
}

export type UniversalLinkProps = {
  children: ReactNode
  to?: string
} & ComponentProps<'a'> & {
    ref?: Ref<Element>
  } & XStyledProps

const UniversalLink = ({
  children,
  target,
  rel: propsRel,
  to,
  as: propsAs,
  href: propsHref,
  ...props
}: UniversalLinkProps): JSX.Element => {
  const { linkComponent = 'a' } = useTheme()
  const isBlank = target === '_blank'
  const rel = propsRel || (isBlank ? 'noopener noreferrer' : undefined)
  const href = to || propsHref
  const asValue =
    propsAs ||
    (needNativeLink(href) ? 'a' : (linkComponent as ElementType<unknown>))
  const parameter = asValue === 'a' ? 'href' : 'to'

  return (
    <Box
      {...props}
      target={target}
      as={asValue}
      {...{ [parameter]: href }}
      rel={rel}
    >
      {children}
    </Box>
  )
}

UniversalLink.propTypes = {
  as: PropTypes.string,
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  rel: PropTypes.string,
  target: PropTypes.string,
  to: PropTypes.string,
}

export default UniversalLink
