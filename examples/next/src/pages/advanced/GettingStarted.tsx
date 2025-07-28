import styled from '@emotion/styled'
import { Snippet, Stack, Text } from '@ultraviolet/ui'
import CopyBox from '../../components/CopyBoxCommand'
import GithubAndDocumentationButtons from '../../components/GithubAndDocumentationButtons'

const themeExample = `import { theme, Button } from "@ultraviolet/ui"
import { ThemeProvider } from "@emotion/react"

const App = () => (
    <ThemeProvider theme={theme}>
        <Button variant="primary" onClick={() => console.log("clicked")}>
          Click Me
        </Button>
    </ThemeProvider>
)`

const FullWidthStack = styled(Stack)`
  width: 100%;
`

const GettingStarted = () => (
  <section>
    <Stack alignItems="center" gap={5}>
      <Text as="h3" id="getting-started" variant="heading">
        Getting Started
      </Text>
      <FullWidthStack gap={4}>
        <Text as="p" variant="body">
          Run one of the following commands in your React project to start using
          Ultraviolet UI:
        </Text>
        <Stack gap={2}>
          <Snippet prefix="command">
            pnpm add @ultraviolet/ui @emotion/react @emotion/styled
          </Snippet>
          <Snippet prefix="command">
            yarn add @ultraviolet/ui @emotion/react @emotion/styled
          </Snippet>
          <Snippet prefix="command">
            npm i @ultraviolet/ui @emotion/react @emotion/styled
          </Snippet>
        </Stack>
      </FullWidthStack>
      <FullWidthStack gap={4}>
        <Text as="p" variant="body">
          Integrate the theme into your project to use our components.
        </Text>
        <CopyBox>
          <CopyBox.Command command={themeExample} title="Theme" />
        </CopyBox>
      </FullWidthStack>
      <GithubAndDocumentationButtons />
    </Stack>
  </section>
)

export default GettingStarted
