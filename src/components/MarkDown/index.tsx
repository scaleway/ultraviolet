import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ReactNode } from 'react'
import ReactMarkDown from 'react-markdown'
import Box, { BoxProps } from '../Box'
import Link from '../Link'
import Text from '../Text'

const StyledLink = styled(Link)`
  font-size: inherit;
`

const StyledText = styled(Text)`
  margin-top: 0;
`

const Container = styled.div`
  display: inline-flex;
  background-color: ${({ theme }) => theme.colors.neutral.backgroundStrong};
  padding: ${({ theme }) => theme.space['1']};
`

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
      <StyledText variant="heading" as="h2">
        {children}
      </StyledText>
    )
  }
  const { heading: Heading } = ReactMarkDown.renderers

  return <Heading {...props}>{children}</Heading>
}

const inlineCodeRenderer = ({ children }: { children: ReactNode }) => (
  <Container>
    <Text as="code" variant="code">
      {children}
    </Text>
  </Container>
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
    <StyledLink variant="info" href={href} {...props}>
      {children}
    </StyledLink>
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

export default MarkDown
