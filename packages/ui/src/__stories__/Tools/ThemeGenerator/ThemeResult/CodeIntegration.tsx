import { useState } from 'react'
import { Snippet, Stack, Tabs, Text } from '../../../../components'
import type { UltravioletUITheme } from '../../../../theme'
import { snippetResult } from './styles.css'

type CodeIntegrationProps = {
  theme: UltravioletUITheme
}

const reactCode = (theme: string) => `
import { Button, normalize } from '@ultraviolet/ui'
import { ThemeProvider } from "@ultraviolet/themes"
import "@ultraviolet/themes/global"

const THEME = ${theme}

const App = () => (
  <ThemeProvider theme={THEME}>
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
        <Snippet className={snippetResult} prefix="lines">
          {tabState === 1 ? formattedTheme : reactCode(formattedTheme)}
        </Snippet>
      </Stack>
    </Stack>
  )
}
