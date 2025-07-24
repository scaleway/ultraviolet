import { ThemeProvider } from '@emotion/react'
import styled from '@emotion/styled'
import { ArrowLeftIcon, EyeIcon, EyeOffIcon } from '@ultraviolet/icons'
import { useCallback, useState } from 'react'
import { Button, Row, Stack, Text } from '../../../../components'
import type { UltravioletUITheme } from '../../../../theme'
import consoleLightTheme from '../../../../theme'
import { normalize } from '../../../../utils'
import { CodeIntegration } from './CodeIntegration'
import { Demo } from './Demo' // For some reason Global doesn't work here this is the workaround I found

// For some reason Global doesn't work here this is the workaround I found
const Container = styled.div`
  ${normalize()}
`

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
      <Row templateColumns="1fr 2fr 1fr" alignItems="center">
        <div style={{ display: 'inline-block' }}>
          <Button
            sentiment="neutral"
            variant="filled"
            onClick={() => setStep(0)}
          >
            <ArrowLeftIcon />
            Back
          </Button>
        </div>
        <Stack justifyContent="center" alignItems="center">
          <Text as="h1" variant="heading">
            Generated Result
          </Text>
        </Stack>
        <div style={{ display: 'inline-block', textAlign: 'end' }}>
          <Button
            sentiment="primary"
            variant="outlined"
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseOut={onMouseUp}
          >
            {isVisible ? <EyeIcon /> : <EyeOffIcon />}
            Preview original theme
          </Button>
        </div>
      </Row>
      <Stack gap={4}>
        <ThemeProvider theme={theme}>
          <Container>
            <Demo />
          </Container>
        </ThemeProvider>
        <CodeIntegration theme={generatedPalette} />
      </Stack>
    </Stack>
  )
}
