import { consoleDarkTheme, consoleLightTheme } from '@ultraviolet/themes'
import {
  Alert,
  Button,
  Card,
  Row,
  Stack,
  Text,
  ThemeProvider,
  Badge,
  SelectableCardOptionGroup,
} from '@ultraviolet/ui'
import { InfoTable } from '@ultraviolet/ui/compositions/InfoTable'
import { useState } from 'react'
import '@ultraviolet/ui/styles' // Import styles for the UI components
import '@ultraviolet/themes/global'
import centos from './assets/centos.svg'
import debian from './assets/debian.svg'
import ubuntu from './assets/ubuntu.svg'
import { centosOptions, debianOptions, ubuntuOptions } from './constants'

export const App = () => {
  const [count, setCount] = useState(0)
  const [darkMode, setDarkMode] = useState(false)
  const [value, onChange] = useState<string>()
  const [option, onChangeOption] = useState<string>()

  return (
    <ThemeProvider theme={darkMode ? consoleDarkTheme : consoleLightTheme}>
      <Row gap="3" templateColumns="auto auto">
        <Badge sentiment="danger" prominence="strong">
          test
        </Badge>
        <InfoTable>
          <InfoTable.Row templateColumns="1fr">
            <InfoTable.Cell title="title">Coucou</InfoTable.Cell>
          </InfoTable.Row>
        </InfoTable>
        <SelectableCardOptionGroup
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            console.log('ok')
            onChange(event.currentTarget.value)
          }}
          onChangeOption={(newValue: string) => {
            onChangeOption(newValue)
          }}
          optionValue={option}
          value={value}
        >
          <SelectableCardOptionGroup.Option
            image={ubuntu}
            label="Ubuntu"
            options={ubuntuOptions}
            value="ubuntu"
          />
          <SelectableCardOptionGroup.Option
            image={debian}
            label="Debian"
            options={debianOptions}
            value="debian"
          />
          <SelectableCardOptionGroup.Option
            image={centos}
            label="CentOS"
            options={centosOptions}
            value="centos"
          />
        </SelectableCardOptionGroup>
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
