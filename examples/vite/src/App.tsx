import { PlusIcon } from '@ultraviolet/icons'
import {
  consoleDarkTheme,
  consoleLightTheme,
  ThemeProvider,
} from '@ultraviolet/themes'
import { Alert, Button, Card, Row, Stack, Text } from '@ultraviolet/ui'
import { useState } from 'react'
import '@ultraviolet/themes/global'
import '@ultraviolet/ui/styles' // Import styles for the UI components
import '@ultraviolet/plus/styles' // Import styles for the Plus components
import { Navigation } from './components/Navigation'

export const App = () => {
  const [count, setCount] = useState(0)
  const [darkMode, setDarkMode] = useState(false)

  return (
    <ThemeProvider theme={darkMode ? consoleDarkTheme : consoleLightTheme}>
      <Row gap="2" templateColumns="auto 9fr">
        <Navigation />
        <Stack direction="column" gap="4">
          <Text
            as="h1"
            placement="center"
            sentiment="neutral"
            variant="headingStronger"
          >
            headingLargeStrong h1
          </Text>
          <Card>
            <Text as="h2" variant="headingSmallStrong">
              headingSmallStrong h2
            </Text>
            <Stack direction="column" gap="2">
              <Stack direction="row" gap="2">
                <Button onClick={() => setCount(prevCount => prevCount + 1)}>
                  <PlusIcon />
                </Button>
                <Button onClick={() => setCount(0)}>Reset</Button>
                <Button
                  onClick={() => setDarkMode(!darkMode)}
                  sentiment="danger"
                >
                  Switch Theme
                </Button>
              </Stack>

              <Text as="p" variant="body">
                Count:{count}
              </Text>
              <Alert sentiment="info">Alert</Alert>
            </Stack>
          </Card>
        </Stack>
      </Row>
    </ThemeProvider>
  )
}
