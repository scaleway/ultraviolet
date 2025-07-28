import { useCallback, useEffect, useState } from 'react'
import {
  generatePalette,
  TOKENS_URL,
} from '../../../../../../utils/scripts/figma-synchronise-tokens'
import { Form, useForm } from '../../../../../form/src'
import { Stack, Text } from '../../../components'
import type { UltravioletUITheme } from '../../../theme'
import consoleLightTheme from '../../../theme'
import { INITIAL_VALUES, SHADES_KEYS, SHADES_KEYS_MATCHING } from './contants'
import { FormContent } from './FormContent'
import { generateShadeContrast } from './helpers'
import { ThemeResult } from './ThemeResult'

type JsonTokenType = {
  paletteLight: {
    shades: Record<
      string,
      {
        value: string
        type: 'color'
      }
    >
  }
}

export const ThemeGenerator = () => {
  const [step, setStep] = useState(0)
  const [generatedPalette, setGeneratedPalette] = useState(consoleLightTheme)
  const [theme, setTheme] = useState(consoleLightTheme)
  const [savedFormValues, setSavedFormValues] = useState<
    typeof INITIAL_VALUES | null
  >(null)

  const methods = useForm({
    values: savedFormValues ?? INITIAL_VALUES,
    mode: 'onChange',
  })

  useEffect(() => {
    setTheme(generatedPalette)
  }, [generatedPalette])

  const onSubmit = useCallback(async (values: typeof INITIAL_VALUES) => {
    setSavedFormValues(values)
    const shades = values.sentiments.reduce((acc, { key, value }) => {
      if (Array.isArray(SHADES_KEYS_MATCHING[key])) {
        return {
          ...(SHADES_KEYS_MATCHING[key] as string[]).reduce(
            (firstacc, localKey) => ({
              [localKey]: SHADES_KEYS.reduce(
                (secondAcc, shadeKey, index) => ({
                  [shadeKey]: {
                    value: generateShadeContrast(shadeKey, value, index),
                    type: 'color',
                  },
                  ...secondAcc,
                }),
                {},
              ),
              ...firstacc,
            }),
            {},
          ),
          ...acc,
        }
      }

      return {
        [SHADES_KEYS_MATCHING[key]]: SHADES_KEYS.reduce(
          (secondAcc, shadeKey, index) => ({
            [shadeKey]: {
              value: generateShadeContrast(shadeKey, value, index),
              type: 'color',
            },
            ...secondAcc,
          }),
          {},
        ),
        ...acc,
      }
    }, {})

    const figmaTokensResponse = await fetch(TOKENS_URL as string)
    const figmaTokensJson = (await figmaTokensResponse.json()) as JsonTokenType

    const overloadedTokens = {
      ...figmaTokensJson,
      paletteLight: {
        ...figmaTokensJson.paletteLight,
        shades: {
          ...figmaTokensJson.paletteLight.shades,
          ...shades,
        },
      },
    }

    const tempGeneratedPalette = generatePalette(overloadedTokens, {
      inputTheme: 'productLight',
      palette: 'paletteLight',
      outputTheme: 'light',
    }) as UltravioletUITheme

    setGeneratedPalette(tempGeneratedPalette)
    setStep(1)
  }, [])

  return (
    <Stack gap={4}>
      {step === 0 ? (
        <Stack gap={2}>
          <Stack>
            <Text variant="headingLarge" as="h1">
              ✨ Theme generator
            </Text>
            <Text as="p" variant="body">
              There is around <b>175 token colors</b> in Ultraviolet theme. It
              can be hard to set each of them one by one and understanding their
              usage in the components. Theme generator is here to help you
              create a new theme for your project FAST 🚀.
            </Text>

            <Text variant="headingSmall" as="h3">
              How does it work?
            </Text>
            <Text as="p" variant="body">
              You basically just need to fill this form with the name and color
              of each sentiment you want to use in your project. The color you
              will set will be the most used color in the theme and the other
              colors will be generated from it. So do not choose a color too
              dark or too bright.
            </Text>
          </Stack>
          <Form
            onSubmit={onSubmit}
            methods={methods}
            errors={{
              min: () => '',
              max: () => '',
              minLength: () => '',
              maxLength: () => '',
              pattern: () => 'The hexadecimal color is not valid.',
              required: () => '',
              maxDate: () => '',
              minDate: () => '',
              isInteger: () => '',
            }}
          >
            <FormContent />
          </Form>
        </Stack>
      ) : (
        <ThemeResult
          theme={theme}
          setTheme={setTheme}
          generatedPalette={generatedPalette}
          setStep={setStep}
        />
      )}
    </Stack>
  )
}
