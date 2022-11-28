import styled from '@emotion/styled'
import { Snippet, Stack, Text } from '@scaleway/ui'
import GithubAndDocumentationButtons from '../../components/GithubAndDocumentationButtons'

const command = `import { theme, Button } from "@scaleway/ui"
import { ThemeProvider } from "@emotion/react"

const App = () => (
    <ThemeProvider theme={theme}>
        <Button variant="primary" onClick={() => console.log("clicked")}>
          Click Me
        </Button>
    </ThemeProvider>
)`

const RelativeDiv = styled.div`
  position: relative;
`

const HeadStartContainer = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  align-items: initial;
  flex-direction: column;
  gap: ${({ theme }) => theme.space['4']};
`

const GettingStarted = () => (
  <Stack gap={5} alignItems="center">
    <Text as="h3" variant="heading">
      Getting Started
    </Text>
    <Stack gap={4}>
      <Text as="p" variant="body">
        Run one of the following commands in your React project to start using
        Scaleway UI:
      </Text>
      <RelativeDiv>
        <Snippet prefix="command">
          pnpm add @scaleway/ui @emotion/react @emotion/styled
        </Snippet>
      </RelativeDiv>
      <RelativeDiv>
        <Snippet prefix="command">
          yarn add @scaleway/ui @emotion/react @emotion/styled
        </Snippet>
      </RelativeDiv>
      <RelativeDiv>
        <Snippet prefix="command">
          npm i @scaleway/ui @emotion/react @emotion/styled
        </Snippet>
      </RelativeDiv>
    </Stack>
    <Stack gap={4}>
      <Text as="p" variant="body">
        Integrate the theme into your project to use our components.
      </Text>
      <Snippet prefix="command">{command}</Snippet>
    </Stack>
    <GithubAndDocumentationButtons />
  </Stack>
)

export default GettingStarted
