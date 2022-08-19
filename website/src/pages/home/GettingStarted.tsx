import styled from '@emotion/styled'
import { Col, Grid, Row, Typography } from '@scaleway/ui'
import React from 'react'
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
  margin-bottom: 32px;
`

const GettingStarted = (): JSX.Element => (
  <Grid mb={9}>
    <Row textAlign="center" justifyContent="center">
      <Col xsmall={10}>
        <Typography variant="hero" mb={5}>
          Getting Started
        </Typography>
        <Typography textAlign="justify" mb={5}>
          Run one of the following commands in your React project to start using
          Scaleway UI:
        </Typography>
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
        <Typography textAlign="justify" mt={5} mb={5}>
          Integrate the theme into your project to use our components.
        </Typography>
        <CopyBox>
          <CopyBox.Command title="Provide theme" command={command} />
        </CopyBox>
      </Col>
    </Row>
    <Row textAlign="center" mt={4}>
      <Col>
        <GithubAndDocumentationButtons />
      </Col>
    </Row>
  </Grid>
)

export default GettingStarted
