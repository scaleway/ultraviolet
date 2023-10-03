import deepmerge from 'deepmerge'
import { ReactNode, useCallback } from 'react'
import type { LocaleValue, Params } from 'international-types'
import formatters from './formatters'
import type { NumberFormatOptions } from '@formatjs/ecma402-abstract'

const mergeLocales = <T>(defaultLocales: T, locales: T) =>
  deepmerge<T>(defaultLocales, locales)

export type ReactParamsObject<Value extends LocaleValue> = Record<
  Params<Value>[number],
  LocaleValue | ReactNode
>

export const useI18nExtend = <T>(
  defaultLocales: T,
  locales?: T,
  enableDebugKey?: boolean,
) => {
  const translations = locales
    ? mergeLocales<T>(defaultLocales, locales)
    : defaultLocales

  const translate = useCallback(
    (key: keyof T, context?: ReactParamsObject<any>) => {
      const value = translations?.[key] as string
      if (enableDebugKey) {
        return key
      }

      if (!value) {
        return ''
      }
      if (context) {
        return formatters
          .getTranslationFormat(value, translations as string)
          .format(context) as string
      }

      return value
    },
    [translations, enableDebugKey],
  )

  const formatNumber = useCallback(
    (numb: number, options?: NumberFormatOptions) =>
      formatters.getNumberFormat(undefined, options).format(numb),
    [],
  )

  return { t: translate, formatNumber }
}
