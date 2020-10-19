import React from 'react'
import { useTheme } from 'utils'
import { Box } from 'components/Box'

const ABSOLUTE_LINK_REGEXP = /^https?:\/\//
function needNativeLink(url) {
  if (!url) return false
  const isAbsolute = ABSOLUTE_LINK_REGEXP.test(url)
  const isAnchor = url[0] === '#'
  return isAbsolute || isAnchor
}

export function UniversalLink({ variant, children, ...props }) {
  const { linkComponent = 'a' } = useTheme()
  const isBlank = props.target === '_blank'
  const rel = props.rel || (isBlank ? 'noopener noreferrer' : undefined)
  const href = props.to || props.href
  const as = props.as || (needNativeLink(href) ? 'a' : linkComponent)
  return (
    <Box {...props} as={as} href={href} rel={rel}>
      {children}
    </Box>
  )
}
