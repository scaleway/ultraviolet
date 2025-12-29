import { ArrowLeftIcon, EyeIcon, EyeOffIcon } from '@ultraviolet/icons'
import { ThemeProvider } from '@ultraviolet/themes'
import type { UltravioletUITheme } from '@ultraviolet/ui'
import {
  Button,
  theme as consoleLightTheme,
  Row,
  Stack,
  Text,
} from '@ultraviolet/ui'
import { useCallback, useState } from 'react'
import { CodeIntegration } from './CodeIntegration'
import { Demo } from './Demo' // For some reason Global doesn't work here this is the workaround I found

type ThemeResultProps = {
  theme: UltravioletUITheme
  setTheme: (theme: UltravioletUITheme) => void
  generatedPalette: UltravioletUITheme
  setStep: (step: number) => void
}

export const ThemeResult = ({
  theme,
  setTheme,
  generatedPalette,
  setStep,
}: ThemeResultProps) => {
  const [isVisible, setIsVisible] = useState(false)

  const onMouseUp = useCallback(() => {
    setIsVisible(false)
    setTheme(generatedPalette)
  }, [generatedPalette, setTheme])

  const onMouseDown = useCallback(() => {
    setIsVisible(true)
    setTheme(consoleLightTheme)
  }, [setTheme])

  return (
    <Stack gap={4}>
      <Row alignItems="center" templateColumns="1fr 2fr 1fr">
        <div style={{ display: 'inline-block' }}>
          <Button
            onClick={() => setStep(0)}
            sentiment="neutral"
            variant="filled"
          >
            <ArrowLeftIcon />
            Back
          </Button>
        </div>
        <Stack alignItems="center" justifyContent="center">
          <Text as="h1" variant="heading">
            Generated Result
          </Text>
        </Stack>
        <div style={{ display: 'inline-block', textAlign: 'end' }}>
          <Button
            onMouseDown={onMouseDown}
            onMouseOut={onMouseUp}
            onMouseUp={onMouseUp}
            sentiment="primary"
            variant="outlined"
          >
            {isVisible ? <EyeIcon /> : <EyeOffIcon />}
            Preview original theme
          </Button>
        </div>
      </Row>
      <Stack gap={4}>
        <ThemeProvider theme={theme}>
          <Demo />
        </ThemeProvider>
        <CodeIntegration theme={generatedPalette} />
      </Stack>
    </Stack>
  )
}
