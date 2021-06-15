import { css } from '@emotion/react'
import PropTypes from 'prop-types'
import React from 'react'
import ReactMarkDown from 'react-markdown'
import Box from '../Box'
import Link from '../Link'
import Typography from '../Typography'

const headingRenderer = ({ node, children, ...props }) => {
  if (props.level === 1) {
    return (
      <Typography mt={0} variant="lead-block">
        {children}
      </Typography>
    )
  }
  const { heading: Heading } = ReactMarkDown.renderers

  return <Heading {...props}>{children}</Heading>
}

const inlineCodeRenderer = props => (
  <Typography variant="command">{props.children}</Typography>
)
const textRenderer = props => <Box as="span">{props.children}</Box>
const paragraphRenderer = props => <Box as="p">{props.children}</Box>
const linkRenderer = ({ children, node, ...props }) => {
  if (!props.href) {
    return null
  }

  return (
    <Link variant="blue" to={props.href} {...props}>
      {children}
    </Link>
  )
}

const RootRendererComponent = ({ inline, parentProps, children }) => (
  <Box
    as={inline ? 'span' : 'div'}
    css={
      inline &&
      css`
        > p {
          display: inline;
        }
      `
    }
    {...parentProps}
  >
    {children}
  </Box>
)
RootRendererComponent.propTypes = {
  children: PropTypes.node,
  inline: PropTypes.bool,
  parentProps: PropTypes.shape({}),
}

RootRendererComponent.defaultProps = {
  children: null,
  inline: false,
  parentProps: {},
}

const rootRenderer = (inline, parentProps) => props =>
  <RootRendererComponent {...props} inline={inline} parentProps={parentProps} />

const MarkDown = ({ source, linkTarget, escapeHtml, inline, ...props }) => (
  <ReactMarkDown
    source={source}
    renderers={{
      heading: headingRenderer,
      inlineCode: inlineCodeRenderer,
      link: linkRenderer,
      paragraph: paragraphRenderer,
      root: rootRenderer(inline, props),
      text: textRenderer,
    }}
    linkTarget={linkTarget}
    escapeHtml={escapeHtml}
  />
)

MarkDown.propTypes = {
  escapeHtml: PropTypes.bool,
  inline: PropTypes.bool,
  linkTarget: PropTypes.string,
  source: PropTypes.string.isRequired,
}

MarkDown.defaultProps = {
  escapeHtml: true,
  inline: false,
  linkTarget: null,
}

export default MarkDown
