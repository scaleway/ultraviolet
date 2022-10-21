import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ReactNode } from 'react'
import ReactMarkDown from 'react-markdown'
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

const MdHeading = ({
  children,
  ...props
}: {
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

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Heading {...props}>{children}</Heading>
}

const MdCode = ({ children }: { children: ReactNode }) => (
  <Container>
    <Text as="code" variant="code">
      {children}
    </Text>
  </Container>
)
const MdText = ({ children }: { children: ReactNode }) => (
  <span>{children}</span>
)
const MdParagraph = ({ children }: { children: ReactNode }) => <p>{children}</p>

const MdLink = ({ children, href }: { href: string; children: ReactNode }) => {
  if (!href) {
    return null
  }

  return (
    <StyledLink variant="info" href={href}>
      {children}
    </StyledLink>
  )
}

const StyledContainer = styled('div', {
  shouldForwardProp: prop => !['inline'].includes(prop),
})<{ inline?: boolean }>`
  ${({ inline }) =>
    inline &&
    css`
      > p {
        display: inline;
      }
    `}
`

type MarkDownContainerProps = Pick<MarkDownProps, 'inline' | 'className'>

const rootRenderer =
  ({ inline, className }: MarkDownContainerProps) =>
  ({ children }: { children: ReactNode[] }) =>
    (
      <StyledContainer inline={inline} className={className}>
        {children}
      </StyledContainer>
    )

type MarkDownProps = {
  source: string
  linkTarget?: string
  escapeHtml?: boolean
  inline?: boolean
  className?: string
}

const MarkDown = ({
  source,
  linkTarget,
  escapeHtml = true,
  inline,
  className,
}: MarkDownProps) => (
  <ReactMarkDown
    source={source}
    renderers={{
      heading: MdHeading,
      inlineCode: MdCode,
      link: MdLink,
      paragraph: MdParagraph,
      root: rootRenderer({ inline, className }),
      text: MdText,
    }}
    linkTarget={linkTarget}
    escapeHtml={escapeHtml}
  />
)

export default MarkDown
