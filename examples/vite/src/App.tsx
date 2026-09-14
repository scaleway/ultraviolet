import { instanceOriginal } from '@ultraviolet/illustrations/products/instance'
import { consoleDarkerTheme, consoleDarkTheme, consoleLightTheme, ThemeProvider } from '@ultraviolet/themes'
import {
  Alert,
  Button,
  Card,
  Stack,
  Text,
  Badge,
  SelectableCardOptionGroup,
  SwitchButton,
  Separator,
} from '@ultraviolet/ui'
import { useState } from 'react'
import '@ultraviolet/ui/styles' // Import styles for the UI components
import '@ultraviolet/icons/styles' // Import styles for the icons components
import '@ultraviolet/themes/global'
import centos from './assets/centos.svg'
import debian from './assets/debian.svg'
import ubuntu from './assets/ubuntu.svg'
import { centosOptions, debianOptions, ubuntuOptions } from './constants'
import { DemoForm } from './DemoForm'
import './style.css'

const getTheme = (theme: string) => {
  if (theme === 'dark') {
    return consoleDarkTheme
  }
  if (theme === 'darker') {
    return consoleDarkerTheme
  }
  return consoleLightTheme
}
export const App = () => {
  const [count, setCount] = useState(0)
  const [mode, setMode] = useState('light')
  const [value, onChange] = useState<string>()
  const [option, onChangeOption] = useState<string>()

  return (
    <ThemeProvider theme={getTheme(mode)} cssLayer="vite-app">
      <Stack gap={4} style={{ padding: '32px' }} alignItems="center" width="100%">
        <SwitchButton
          onChange={value => {
            setMode(value.currentTarget.value)
          }}
          value="light"
        >
          <SwitchButton.Option value="light">light mode</SwitchButton.Option>
          <SwitchButton.Option value="dark">dark mode</SwitchButton.Option>
          <SwitchButton.Option value="darker">darker mode</SwitchButton.Option>
        </SwitchButton>
        <Stack className="test" style={{ color: 'var(--color-primary-text)' }}>
          This box uses css variables from ultraviolet/theme outside of vanilla extract without importing{' '}
          <code>'@ultraviolet/themes/light.css'</code> (and variants)
        </Stack>
        <Separator direction="horizontal" style={{ width: '100%' }} />
        <Text as="h2" variant="headingStrong">
          Playground
        </Text>
        <Stack gap="3">
          <Stack>
            <Badge sentiment="danger" prominence="strong">
              test
            </Badge>
            <img src={instanceOriginal} width="200" />
          </Stack>
          <SelectableCardOptionGroup
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              onChange(event.currentTarget.value)
            }}
            onChangeOption={(newValue: string) => {
              onChangeOption(newValue)
            }}
            optionValue={option}
            value={value}
          >
            <SelectableCardOptionGroup.Option image={ubuntu} label="Ubuntu" options={ubuntuOptions} value="ubuntu" />
            <SelectableCardOptionGroup.Option image={debian} label="Debian" options={debianOptions} value="debian" />
            <SelectableCardOptionGroup.Option image={centos} label="CentOS" options={centosOptions} value="centos" />
          </SelectableCardOptionGroup>
          <Card>
            <Text as="h1" variant="headingSmall">
              Classic
            </Text>
            <Stack direction="row" gap="2">
              <Button onClick={() => setCount(prevCount => prevCount + 1)}>+</Button>
              <Alert>Alert General</Alert>
              <Button onClick={() => setCount(0)}>Reset</Button>
            </Stack>
            <Text as="p" variant="body">
              Count:{count}
            </Text>
          </Card>
        </Stack>
        <Separator direction="horizontal" style={{ width: '100%' }} />
        <Text as="h2" variant="headingStrong">
          Form
        </Text>
        <DemoForm />
      </Stack>
    </ThemeProvider>
  )
}
