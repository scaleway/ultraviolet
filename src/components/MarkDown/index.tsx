import { css } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { ReactNode } from 'react'
import ReactMarkDown from 'react-markdown'
import Box, { BoxProps } from '../Box'
import Link from '../Link'
import Typography from '../Typography'

const headingRenderer = ({
  node,
  children,
  ...props
}: {
  node: unknown
  level: number
  children: ReactNode
}) => {
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

const inlineCodeRenderer = ({ children }: { children: ReactNode }) => (
  <Typography variant="command">{children}</Typography>
)
const textRenderer = ({ children }: { children: ReactNode }) => (
  <span>{children}</span>
)
const paragraphRenderer = ({ children }: { children: ReactNode }) => (
  <p>{children}</p>
)

const linkRenderer = ({
  node,
  children,
  href,
  ...props
}: {
  node: unknown
  href: string
  children: ReactNode
}) => {
  if (!href) {
    return null
  }

  return (
    <Link variant="info" href={href} {...props}>
      {children}
    </Link>
  )
}

const StyledContainer = styled(Box, {
  shouldForwardProp: prop => !['inline'].includes(prop),
})<{ inline: boolean }>`
  ${({ inline }) =>
    inline &&
    css`
      > p {
        display: inline;
      }
    `}
`

const RootRendererComponent = ({
  inline = false,
  parentProps = {},
  children,
}: {
  children?: ReactNode
  inline?: boolean
  parentProps?: BoxProps
}) => (
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
  (inline: boolean, parentProps: BoxProps) =>
  (props: Record<string, unknown>) =>
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

const MarkDown = ({
  source,
  linkTarget,
  escapeHtml = true,
  inline = false,
  ...props
}: MarkDownProps) => (
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
