import styled from '@emotion/styled'
import { useState } from 'react'
import { Snippet, Stack, Tabs, Text } from '../../../../components'
import type { UltravioletUITheme } from '../../../../theme'

type CodeIntegrationProps = {
  theme: UltravioletUITheme
}

const StyledSnippet = styled(Snippet)`
  pre {
    padding: ${({ theme }) => theme.space['2']};
  }
`

const ReactCode = (theme: string) => `
import { Global, ThemeProvider, css } from '@emotion/react'
import { Button, normalize } from '@ultraviolet/ui'

const THEME = ${theme}

const App = () => (
  <ThemeProvider theme={THEME}>
    <Global styles={css\`\${normalize()}\`} />
    <Button onClick={() => console.log('clicked')}>
      Click Me
    </Button>
  </ThemeProvider>
)

export default App
`

export const CodeIntegration = ({ theme }: CodeIntegrationProps) => {
  const [tabState, setTabState] = useState<number | string>(1)
  const formattedTheme = JSON.stringify(theme, null, 4)

  return (
    <Stack gap={2}>
      <Text as="h1" variant="heading">
        Code integration
      </Text>
      <Stack>
        <Tabs
          onChange={(e: number | string) => setTabState(e)}
          selected={tabState}
        >
          <Tabs.Tab value={1}>JSON</Tabs.Tab>
          <Tabs.Tab value={2}>React</Tabs.Tab>
        </Tabs>
        <StyledSnippet prefix="lines">
          {tabState === 1 ? formattedTheme : ReactCode(formattedTheme)}
        </StyledSnippet>
      </Stack>
    </Stack>
  )
}
