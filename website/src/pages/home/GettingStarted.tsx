import styled from '@emotion/styled'
import { Text } from '@scaleway/ui'
import CopyBox from '../../components/CopyBoxCommand'
import GithubAndDocumentationButtons from '../../components/GithubAndDocumentationButtons'

const install = `pnpm add @scaleway/ui @emotion/react @emotion/styled`
const installYarn = `yarn add @scaleway/ui @emotion/react @emotion/styled`
const installNpm = `npm i @scaleway/ui @emotion/react @emotion/styled`

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

const GettingStartedContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: ${({ theme }) => theme.space['5']};
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
  <GettingStartedContainer>
    <Text as="h3" variant="headingLarge">
      Getting Started
    </Text>
    <HeadStartContainer>
      <Text as="p" variant="body">
        Run one of the following commands in your React project to start using
        Scaleway UI:
      </Text>
      <RelativeDiv>
        <CopyBox>
          <CopyBox.Command
            title="PNPM install"
            command={install}
            showLineNumbers={false}
          />
        </CopyBox>
      </RelativeDiv>
      <RelativeDiv>
        <CopyBox>
          <CopyBox.Command
            title="Yarn install"
            command={installYarn}
            showLineNumbers={false}
          />
        </CopyBox>
      </RelativeDiv>
      <RelativeDiv>
        <CopyBox>
          <CopyBox.Command
            title="NPM install"
            command={installNpm}
            showLineNumbers={false}
          />
        </CopyBox>
      </RelativeDiv>
    </HeadStartContainer>
    <HeadStartContainer>
      <Text as="p" variant="body">
        Integrate the theme into your project to use our components.
      </Text>
      <CopyBox>
        <CopyBox.Command title="Provide theme" command={command} />
      </CopyBox>
    </HeadStartContainer>
    <GithubAndDocumentationButtons />
  </GettingStartedContainer>
)

export default GettingStarted
