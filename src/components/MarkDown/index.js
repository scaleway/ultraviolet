import { css } from '@emotion/react'
import PropTypes from 'prop-types'
import React from 'react'
import ReactMarkDown from 'react-markdown'
import { Box } from '../Box'
import { Command } from '../Command'
import { Link } from '../Link'
import { Typography } from '../Typography'

const headingRenderer = ({ node, ...props }) => {
  if (props.level === 1) {
    return (
      <Typography mt={0} variant="lead-block">
        {props.children}
      </Typography>
    )
  }
  const { heading: Heading } = ReactMarkDown.renderers
  return <Heading {...props} />
}

const inlineCodeRenderer = props => <Command>{props.children}</Command>
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

const RootRendererComponent = props => (
  <Box
    as={props.inline ? 'span' : 'div'}
    css={
      props.inline &&
      css`
        > p {
          display: inline;
        }
      `
    }
    {...props.parentProps}
  >
    {props.children}
  </Box>
)
RootRendererComponent.propTypes = {
  children: PropTypes.node,
  inline: PropTypes.bool,
  parentProps: PropTypes.shape({}),
}

RootRendererComponent.defaultProps = {
  children: '',
  inline: false,
  parentProps: {},
}

const MarkDown = ({ source, linkTarget, escapeHtml, inline, ...props }) => (
  <ReactMarkDown
    source={source}
    renderers={{
      root: rootProps => (
        <RootRendererComponent
          {...rootProps}
          inline={inline}
          parentProps={props}
        />
      ),
      heading: headingRenderer,
      inlineCode: inlineCodeRenderer,
      text: textRenderer,
      paragraph: paragraphRenderer,
      link: linkRenderer,
    }}
    linkTarget={linkTarget}
    escapeHtml={escapeHtml}
  />
)

MarkDown.propTypes = {
  source: PropTypes.string.isRequired,
  linkTarget: PropTypes.string,
  escapeHtml: PropTypes.bool,
  inline: PropTypes.bool,
}

MarkDown.defaultProps = {
  linkTarget: null,
  escapeHtml: true,
  inline: false,
}

export { MarkDown }
