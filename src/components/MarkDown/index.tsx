import { css } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { FunctionComponent, ReactNode } from 'react'
import ReactMarkDown from 'react-markdown'
import Box, { BoxProps } from '../Box'
import Link from '../Link'
import Typography from '../Typography'

const headingRenderer: FunctionComponent<{
  node: unknown
  level: number
}> = ({ node, children, ...props }) => {
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

const inlineCodeRenderer: FunctionComponent = props => (
  <Typography variant="command">{props.children}</Typography>
)
const textRenderer: FunctionComponent = props => <span>{props.children}</span>
const paragraphRenderer: FunctionComponent = props => <p>{props.children}</p>

const linkRenderer: FunctionComponent<{
  node: unknown
  href: string
}> = ({ children, node, ...props }) => {
  if (!props.href) {
    return null
  }

  return (
    <Link variant="blue" to={props.href} {...props}>
      {children}
    </Link>
  )
}

const StyledContainer = styled(Box, {
  shouldForwardProp: prop => !['inline'].includes(prop.toString()),
})<{ inline: boolean }>`
  ${({ inline }) =>
    inline &&
    css`
      > p {
        display: inline;
      }
    `}
`

const RootRendererComponent: FunctionComponent<{
  children?: ReactNode
  inline?: boolean
  parentProps?: BoxProps
}> = ({ inline = false, parentProps = {}, children }) => (
  <StyledContainer inline={inline} {...parentProps}>
    {children}
  </StyledContainer>
)
RootRendererComponent.propTypes = {
  children: PropTypes.node,
  inline: PropTypes.bool,
  parentProps: PropTypes.shape({}),
}

const rootRenderer =
  (inline: boolean, parentProps: BoxProps): FunctionComponent =>
  props =>
    (
      <RootRendererComponent
        {...props}
        inline={inline}
        parentProps={parentProps}
      />
    )

type MarkDownProps = {
  source: string
  linkTarget?: string
  escapeHtml?: boolean
  inline?: boolean
} & BoxProps

const MarkDown: FunctionComponent<MarkDownProps> = ({
  source,
  linkTarget,
  escapeHtml = true,
  inline = false,
  ...props
}) => (
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

export default MarkDown
