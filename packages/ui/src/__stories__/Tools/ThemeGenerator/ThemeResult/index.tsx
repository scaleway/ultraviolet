import { ThemeProvider } from '@emotion/react'
import styled from '@emotion/styled'
import { useCallback, useState } from 'react'
import { Button, Row, Stack, Text } from '../../../../components'
import type { SCWUITheme } from '../../../../theme'
import consoleLightTheme from '../../../../theme'
import { normalize } from '../../../../utils'
import { CodeIntegration } from './CodeIntegration'
import { Demo } from './Demo' // For some reason Global doesn't work here this is the workaround I found

// For some reason Global doesn't work here this is the workaround I found
const Container = styled.div`
  ${normalize()}
`

type ThemeResultProps = {
  theme: SCWUITheme
  setTheme: (theme: SCWUITheme) => void
  generatedPalette: SCWUITheme
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
            icon="arrow-left"
            iconPosition="left"
            onClick={() => setStep(0)}
          >
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
            icon={isVisible ? 'eye' : 'eye-off'}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseOut={onMouseUp}
          >
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
