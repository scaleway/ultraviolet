import { consoleDarkTheme, consoleLightTheme } from '@ultraviolet/themes'
import {
  Alert,
  Button,
  Card,
  Row,
  Stack,
  Text,
  ThemeProvider,
} from '@ultraviolet/ui'
import { useState } from 'react'
import '@ultraviolet/ui/styles' // Import styles for the UI components
// import '@ultraviolet/icons/styles' // Import styles for the UI components
import '@ultraviolet/themes/global'

export const App = () => {
  const [count, setCount] = useState(0)
  const [darkMode, setDarkMode] = useState(false)

  return (
    <ThemeProvider theme={darkMode ? consoleDarkTheme : consoleLightTheme}>
      <Row gap="3" templateColumns="9fr 3fr">
        <Card>
          <Text as="h1" variant="headingSmall">
            Classic
          </Text>
          <Stack direction="row" gap="2">
            <Button onClick={() => setCount(prevCount => prevCount + 1)}>
              +
            </Button>
            <Alert>Alert General</Alert>
            <Button onClick={() => setCount(0)}>Reset</Button>
            <Button onClick={() => setDarkMode(!darkMode)} sentiment="danger">
              Switch Theme
            </Button>
          </Stack>
          <Text as="p" variant="body">
            Count:{count}
          </Text>
        </Card>
        <Alert sentiment="info">Alert</Alert>
      </Row>
    </ThemeProvider>
  )
}
