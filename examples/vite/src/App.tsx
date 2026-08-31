import { MoonIcon } from '@ultraviolet/icons/MoonIcon'
import { SunIcon } from '@ultraviolet/icons/SunIcon'
import { instanceOriginal } from '@ultraviolet/illustrations/products/instance'
import { ThemesProvider, useThemes } from '@ultraviolet/themes'
import type { ConsoleTheme } from '@ultraviolet/themes'
import { Alert, Button, Card, Row, Stack, Text, Badge, Toggle, SelectableCardOptionGroup } from '@ultraviolet/ui'
import { InfoTable } from '@ultraviolet/ui/compositions/InfoTable'
import { useState } from 'react'
import '@ultraviolet/ui/styles' // Import styles for the UI components
import '@ultraviolet/icons/styles'
import centos from './assets/centos.svg'
import debian from './assets/debian.svg'
import ubuntu from './assets/ubuntu.svg'
import { centosOptions, debianOptions, ubuntuOptions } from './constants'
import { DemoForm } from './DemoForm'

const THEME_OPTIONS: { label: string; value: ConsoleTheme }[] = [
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
  { label: 'Darker', value: 'darker' },
]

const ThemeSwitcher = () => {
  const { themeName, setThemeName, toggleTheme } = useThemes()

  return (
    <Stack direction="row" gap="2" alignItems="center" wrap="wrap">
      <SunIcon size="small" />
      <Toggle checked={themeName !== 'light'} name="themeMode" onChange={toggleTheme} />
      <MoonIcon size="small" />
      {THEME_OPTIONS.map(option => (
        <Button
          key={option.value}
          size="small"
          sentiment={themeName === option.value ? 'primary' : 'neutral'}
          variant={themeName === option.value ? 'filled' : 'outline'}
          onClick={() => setThemeName(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </Stack>
  )
}

const Playground = () => {
  const [count, setCount] = useState(0)
  const [value, onChange] = useState<string>()
  const [option, onChangeOption] = useState<string>()
  const { themeName } = useThemes()

  return (
    <Stack gap={4} style={{ padding: '32px' }}>
      <Text as="h2" variant="headingStrong">
        Playground
      </Text>
      <ThemeSwitcher />
      <Row gap="3" templateColumns="auto auto">
        <Stack>
          <Badge sentiment="danger" prominence="strong">
            test
          </Badge>
          <img src={instanceOriginal} width="200" />
        </Stack>
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
            <Button sentiment="danger">Theme: {themeName}</Button>
          </Stack>
          <Text as="p" variant="body">
            Count:{count}
          </Text>
        </Card>
        <Alert sentiment="info">Alert</Alert>
      </Row>

      <Text as="h2" variant="headingStrong">
        Form
      </Text>
      <DemoForm />
    </Stack>
  )
}

export const App = () => (
  <ThemesProvider>
    <Playground />
  </ThemesProvider>
)
