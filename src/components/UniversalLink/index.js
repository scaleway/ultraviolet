import PropTypes from 'prop-types'
import React from 'react'
import { useTheme } from '../../utils'
import { Box } from '../Box'

const ABSOLUTE_LINK_REGEXP = /^https?:\/\//
const TEL_LINK_REGEXP = /^tel?:/

const needNativeLink = url => {
  if (!url) return false
  const isAbsolute = ABSOLUTE_LINK_REGEXP.test(url)
  const isTelLink = TEL_LINK_REGEXP.test(url)
  const isAnchor = url[0] === '#'
  return isAbsolute || isTelLink || isAnchor
}

const UniversalLink = ({ children, ...props }) => {
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

UniversalLink.propTypes = {
  children: PropTypes.node.isRequired,
  target: PropTypes.string,
  rel: PropTypes.string,
  to: PropTypes.string,
  href: PropTypes.string,
  as: PropTypes.string,
}

UniversalLink.defaultProps = {
  target: undefined,
  rel: undefined,
  to: null,
  href: null,
  as: null,
}

export { UniversalLink }
